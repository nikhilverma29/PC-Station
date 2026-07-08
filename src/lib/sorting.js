// Sort option definitions per category, used in the ComponentStep dropdown.
export const SORT_OPTIONS = {
  cpu: [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Performance',        value: 'cpu-perf' },
    { label: 'Core Count',         value: 'cpu-cores' },
    { label: 'Power Efficiency',   value: 'cpu-tdp' },
  ],
  gpu: [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'VRAM: High to Low',  value: 'gpu-vram' },
    { label: 'Performance',        value: 'gpu-perf' },
    { label: 'Power Efficiency',   value: 'gpu-tdp' },
  ],
  motherboard: [
    { label: 'Price: Low to High',  value: 'price-asc' },
    { label: 'Price: High to Low',  value: 'price-desc' },
    { label: 'RAM Slots: High to Low', value: 'mobo-ram' },
    { label: 'Form Factor',         value: 'mobo-form' },
  ],
  ram: [
    { label: 'Price: Low to High',  value: 'price-asc' },
    { label: 'Price: High to Low',  value: 'price-desc' },
    { label: 'Capacity: High to Low', value: 'ram-cap' },
    { label: 'Speed: High to Low',  value: 'ram-speed' },
    { label: 'Latency: Low to High', value: 'ram-lat' },
  ],
  storage: [
    { label: 'Price: Low to High',       value: 'price-asc' },
    { label: 'Price: High to Low',       value: 'price-desc' },
    { label: 'Capacity: High to Low',    value: 'storage-cap' },
    { label: 'Read Speed: High to Low',  value: 'storage-read' },
    { label: 'Write Speed: High to Low', value: 'storage-write' },
  ],
  pccase: [
    { label: 'Price: Low to High',         value: 'price-asc' },
    { label: 'Price: High to Low',         value: 'price-desc' },
    { label: 'Fan Support: High to Low',   value: 'case-fans' },
    { label: 'Max GPU Length: High to Low', value: 'case-gpu' },
  ],
  psu: [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Wattage: High to Low', value: 'psu-watt' },
    { label: 'Efficiency Rating',  value: 'psu-eff' },
  ],
};

function parseGHz(str)      { return parseFloat(String(str || '').replace(/[^\d.]/g, '')) || 0; }
function parseVRAM(str)     { return parseInt(String(str || ''), 10) || 0; }
function parseMHz(str)      { return parseInt(String(str || '').replace(/\D/g, ''), 10) || 0; }
function parseCL(str)       { return parseInt(String(str || '').replace(/\D/g, ''), 10) || 999; }
function parseSpeed(str)    { return parseInt(String(str || '').replace(/\D/g, ''), 10) || 0; }

function parseCapacityTB(str) {
  const match = String(str || '').match(/([\d.]+)\s*(TB|GB)/i);
  if (!match) return 0;
  return match[2].toUpperCase() === 'GB' ? parseFloat(match[1]) / 1024 : parseFloat(match[1]);
}

function parseFanCount(str) {
  const m = String(str || '').match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

function efficiencyTier(str) {
  const t = String(str || '').toLowerCase();
  if (t.includes('titanium')) return 4;
  if (t.includes('platinum')) return 3;
  if (t.includes('gold'))     return 2;
  if (t.includes('bronze'))   return 1;
  return 0;
}

// ATX > Micro-ATX > Mini-ITX for form factor sorting
function formFactorTier(str) {
  const t = String(str || '').toLowerCase();
  if (t === 'atx')                               return 2;
  if (t.includes('micro') || t === 'matx')       return 1;
  if (t.includes('mini')  || t === 'itx')        return 0;
  return -1;
}

export function sortProducts(products, sortBy) {
  if (!sortBy) return products;

  return [...products].sort((a, b) => {
    if (sortBy === 'price-asc')  return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;

    const sA = a.specs || {};
    const sB = b.specs || {};

    switch (sortBy) {
      case 'cpu-perf':   return parseGHz(sB.boostClock) - parseGHz(sA.boostClock);
      case 'cpu-cores':  return (sB.cores || 0) - (sA.cores || 0);
      case 'cpu-tdp':    return (sA.tdp || 0) - (sB.tdp || 0);

      case 'gpu-vram':   return parseVRAM(sB.vram) - parseVRAM(sA.vram);
      case 'gpu-perf':   return parseGHz(sB.boostClock) - parseGHz(sA.boostClock);
      case 'gpu-tdp':    return (sA.tdp || 0) - (sB.tdp || 0);

      case 'mobo-ram':   return (sB.ramSlots || 0) - (sA.ramSlots || 0);
      case 'mobo-form':  return formFactorTier(sB.formFactor) - formFactorTier(sA.formFactor);

      case 'ram-cap':    return parseCapacityTB(sB.capacity) - parseCapacityTB(sA.capacity);
      case 'ram-speed':  return parseMHz(sB.speed) - parseMHz(sA.speed);
      case 'ram-lat':    return parseCL(sA.latency) - parseCL(sB.latency);

      case 'storage-cap':   return parseCapacityTB(sB.capacity) - parseCapacityTB(sA.capacity);
      case 'storage-read':  return parseSpeed(sB.read)  - parseSpeed(sA.read);
      case 'storage-write': return parseSpeed(sB.write) - parseSpeed(sA.write);

      case 'case-fans': return parseFanCount(sB.fans) - parseFanCount(sA.fans);
      case 'case-gpu':  return (sB.maxGpuLength || 0) - (sA.maxGpuLength || 0);

      case 'psu-watt': return (sB.wattage || 0) - (sA.wattage || 0);
      case 'psu-eff':  return efficiencyTier(sB.efficiency) - efficiencyTier(sA.efficiency);

      default: return 0;
    }
  });
}

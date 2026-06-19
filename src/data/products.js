/**
 * PC Forge — Product Data
 *
 * All gaming PC components organized by category.
 * Real product names and realistic pricing.
 * Each product includes compatibility-relevant spec fields.
 */

export const STEP_ORDER = [
  'cpu',
  'gpu',
  'motherboard',
  'ram',
  'storage',
  'pccase',
  'psu',
];

export const STEP_LABELS = {
  cpu: 'Processor',
  gpu: 'Graphics Card',
  motherboard: 'Motherboard',
  ram: 'Memory',
  storage: 'Storage',
  pccase: 'Case',
  psu: 'Power Supply',
};

export const STEP_DESCRIPTIONS = {
  cpu: 'Choose the brain of your build. The processor determines overall system performance.',
  gpu: 'Select your graphics card. This is the most important component for gaming performance.',
  motherboard: 'Pick a motherboard that matches your processor and desired features.',
  ram: 'Choose your system memory. More RAM allows better multitasking.',
  storage: 'Select your storage drive. NVMe SSDs offer the fastest load times.',
  pccase: 'Pick a case that fits your components and matches your style.',
  psu: 'Choose a power supply with enough wattage for your build.',
};

/**
 * Category-level product images from Unsplash (free, stable CDN).
 * One representative image per component category for visual consistency.
 */
export const CATEGORY_IMAGES = {
  cpu: 'https://images.unsplash.com/photo-1555617981-dac3d01ab5eb?w=400&h=300&fit=crop&auto=format&q=80',
  gpu: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=300&fit=crop&auto=format&q=80',
  motherboard: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop&auto=format&q=80',
  ram: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=300&fit=crop&auto=format&q=80',
  storage: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop&auto=format&q=80',
  pccase: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=300&fit=crop&auto=format&q=80',
  psu: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop&auto=format&q=80',
};

// ─── CPUs ────────────────────────────────────────────────

export const cpus = [
  {
    id: 'cpu-001',
    category: 'cpu',
    name: 'AMD Ryzen 9 7950X',
    brand: 'AMD',
    price: 549,
    specs: {
      cores: 16,
      threads: 32,
      baseClock: '4.5 GHz',
      boostClock: '5.7 GHz',
      tdp: 170,
      socket: 'AM5',
    },
    popular: true,
  },
  {
    id: 'cpu-002',
    category: 'cpu',
    name: 'AMD Ryzen 7 7800X3D',
    brand: 'AMD',
    price: 349,
    specs: {
      cores: 8,
      threads: 16,
      baseClock: '4.2 GHz',
      boostClock: '5.0 GHz',
      tdp: 120,
      socket: 'AM5',
    },
    popular: true,
  },
  {
    id: 'cpu-003',
    category: 'cpu',
    name: 'AMD Ryzen 5 7600X',
    brand: 'AMD',
    price: 199,
    specs: {
      cores: 6,
      threads: 12,
      baseClock: '4.7 GHz',
      boostClock: '5.3 GHz',
      tdp: 105,
      socket: 'AM5',
    },
    popular: false,
  },
  {
    id: 'cpu-004',
    category: 'cpu',
    name: 'Intel Core i9-14900K',
    brand: 'Intel',
    price: 544,
    specs: {
      cores: 24,
      threads: 32,
      baseClock: '3.2 GHz',
      boostClock: '6.0 GHz',
      tdp: 253,
      socket: 'LGA1700',
    },
    popular: true,
  },
  {
    id: 'cpu-005',
    category: 'cpu',
    name: 'Intel Core i7-14700K',
    brand: 'Intel',
    price: 384,
    specs: {
      cores: 20,
      threads: 28,
      baseClock: '3.4 GHz',
      boostClock: '5.6 GHz',
      tdp: 253,
      socket: 'LGA1700',
    },
    popular: false,
  },
  {
    id: 'cpu-006',
    category: 'cpu',
    name: 'Intel Core i5-14600K',
    brand: 'Intel',
    price: 249,
    specs: {
      cores: 14,
      threads: 20,
      baseClock: '3.5 GHz',
      boostClock: '5.3 GHz',
      tdp: 181,
      socket: 'LGA1700',
    },
    popular: false,
  },
];

// ─── GPUs ────────────────────────────────────────────────

export const gpus = [
  {
    id: 'gpu-001',
    category: 'gpu',
    name: 'NVIDIA RTX 4090',
    brand: 'NVIDIA',
    price: 1599,
    specs: {
      vram: '24 GB GDDR6X',
      boostClock: '2.52 GHz',
      tdp: 450,
      length: 336,
    },
    popular: true,
  },
  {
    id: 'gpu-002',
    category: 'gpu',
    name: 'NVIDIA RTX 4080 Super',
    brand: 'NVIDIA',
    price: 999,
    specs: {
      vram: '16 GB GDDR6X',
      boostClock: '2.55 GHz',
      tdp: 320,
      length: 304,
    },
    popular: true,
  },
  {
    id: 'gpu-003',
    category: 'gpu',
    name: 'NVIDIA RTX 4070 Ti Super',
    brand: 'NVIDIA',
    price: 799,
    specs: {
      vram: '16 GB GDDR6X',
      boostClock: '2.61 GHz',
      tdp: 285,
      length: 300,
    },
    popular: false,
  },
  {
    id: 'gpu-004',
    category: 'gpu',
    name: 'NVIDIA RTX 4070 Super',
    brand: 'NVIDIA',
    price: 599,
    specs: {
      vram: '12 GB GDDR6X',
      boostClock: '2.48 GHz',
      tdp: 220,
      length: 267,
    },
    popular: false,
  },
  {
    id: 'gpu-005',
    category: 'gpu',
    name: 'AMD Radeon RX 7900 XTX',
    brand: 'AMD',
    price: 899,
    specs: {
      vram: '24 GB GDDR6',
      boostClock: '2.50 GHz',
      tdp: 355,
      length: 287,
    },
    popular: false,
  },
  {
    id: 'gpu-006',
    category: 'gpu',
    name: 'AMD Radeon RX 7800 XT',
    brand: 'AMD',
    price: 479,
    specs: {
      vram: '16 GB GDDR6',
      boostClock: '2.43 GHz',
      tdp: 263,
      length: 267,
    },
    popular: false,
  },
];

// ─── Motherboards ────────────────────────────────────────

export const motherboards = [
  {
    id: 'mb-001',
    category: 'motherboard',
    name: 'ASUS ROG Crosshair X670E Hero',
    brand: 'ASUS',
    price: 699,
    specs: {
      socket: 'AM5',
      chipset: 'X670E',
      formFactor: 'ATX',
      ramType: 'DDR5',
      ramSlots: 4,
      maxRam: '128 GB',
    },
    popular: true,
  },
  {
    id: 'mb-002',
    category: 'motherboard',
    name: 'MSI MAG B650 Tomahawk WiFi',
    brand: 'MSI',
    price: 259,
    specs: {
      socket: 'AM5',
      chipset: 'B650',
      formFactor: 'ATX',
      ramType: 'DDR5',
      ramSlots: 4,
      maxRam: '128 GB',
    },
    popular: true,
  },
  {
    id: 'mb-003',
    category: 'motherboard',
    name: 'Gigabyte B650M Aorus Elite AX',
    brand: 'Gigabyte',
    price: 189,
    specs: {
      socket: 'AM5',
      chipset: 'B650',
      formFactor: 'Micro-ATX',
      ramType: 'DDR5',
      ramSlots: 2,
      maxRam: '64 GB',
    },
    popular: false,
  },
  {
    id: 'mb-004',
    category: 'motherboard',
    name: 'ASUS ROG Maximus Z790 Hero',
    brand: 'ASUS',
    price: 629,
    specs: {
      socket: 'LGA1700',
      chipset: 'Z790',
      formFactor: 'ATX',
      ramType: 'DDR5',
      ramSlots: 4,
      maxRam: '128 GB',
    },
    popular: true,
  },
  {
    id: 'mb-005',
    category: 'motherboard',
    name: 'MSI PRO B760M-A WiFi',
    brand: 'MSI',
    price: 139,
    specs: {
      socket: 'LGA1700',
      chipset: 'B760',
      formFactor: 'Micro-ATX',
      ramType: 'DDR5',
      ramSlots: 2,
      maxRam: '64 GB',
    },
    popular: false,
  },
];

// ─── RAM ─────────────────────────────────────────────────

export const ram = [
  {
    id: 'ram-001',
    category: 'ram',
    name: 'G.Skill Trident Z5 RGB 32GB',
    brand: 'G.Skill',
    price: 124,
    specs: {
      capacity: '32 GB (2x16)',
      type: 'DDR5',
      speed: '6000 MHz',
      latency: 'CL30',
    },
    popular: true,
  },
  {
    id: 'ram-002',
    category: 'ram',
    name: 'Corsair Vengeance 32GB',
    brand: 'Corsair',
    price: 99,
    specs: {
      capacity: '32 GB (2x16)',
      type: 'DDR5',
      speed: '5600 MHz',
      latency: 'CL36',
    },
    popular: true,
  },
  {
    id: 'ram-003',
    category: 'ram',
    name: 'Kingston Fury Beast 64GB',
    brand: 'Kingston',
    price: 219,
    specs: {
      capacity: '64 GB (2x32)',
      type: 'DDR5',
      speed: '5200 MHz',
      latency: 'CL40',
    },
    popular: false,
  },
  {
    id: 'ram-004',
    category: 'ram',
    name: 'G.Skill Trident Z5 RGB 64GB',
    brand: 'G.Skill',
    price: 249,
    specs: {
      capacity: '64 GB (2x32)',
      type: 'DDR5',
      speed: '6400 MHz',
      latency: 'CL32',
    },
    popular: false,
  },
  {
    id: 'ram-005',
    category: 'ram',
    name: 'Corsair Dominator Titanium 32GB',
    brand: 'Corsair',
    price: 189,
    specs: {
      capacity: '32 GB (2x16)',
      type: 'DDR5',
      speed: '7200 MHz',
      latency: 'CL34',
    },
    popular: false,
  },
];

// ─── Storage ─────────────────────────────────────────────

export const storage = [
  {
    id: 'stor-001',
    category: 'storage',
    name: 'Samsung 990 Pro 2TB',
    brand: 'Samsung',
    price: 179,
    specs: {
      capacity: '2 TB',
      type: 'NVMe Gen4',
      read: '7,450 MB/s',
      write: '6,900 MB/s',
    },
    popular: true,
  },
  {
    id: 'stor-002',
    category: 'storage',
    name: 'WD Black SN850X 1TB',
    brand: 'Western Digital',
    price: 89,
    specs: {
      capacity: '1 TB',
      type: 'NVMe Gen4',
      read: '7,300 MB/s',
      write: '6,300 MB/s',
    },
    popular: true,
  },
  {
    id: 'stor-003',
    category: 'storage',
    name: 'Crucial T700 2TB',
    brand: 'Crucial',
    price: 249,
    specs: {
      capacity: '2 TB',
      type: 'NVMe Gen5',
      read: '12,400 MB/s',
      write: '11,800 MB/s',
    },
    popular: false,
  },
  {
    id: 'stor-004',
    category: 'storage',
    name: 'Samsung 870 EVO 2TB',
    brand: 'Samsung',
    price: 149,
    specs: {
      capacity: '2 TB',
      type: 'SATA SSD',
      read: '560 MB/s',
      write: '530 MB/s',
    },
    popular: false,
  },
  {
    id: 'stor-005',
    category: 'storage',
    name: 'Seagate FireCuda 530 4TB',
    brand: 'Seagate',
    price: 499,
    specs: {
      capacity: '4 TB',
      type: 'NVMe Gen4',
      read: '7,300 MB/s',
      write: '6,900 MB/s',
    },
    popular: false,
  },
];

// ─── Cases ───────────────────────────────────────────────

export const cases = [
  {
    id: 'case-001',
    category: 'pccase',
    name: 'Lian Li O11 Dynamic EVO',
    brand: 'Lian Li',
    price: 169,
    specs: {
      formFactor: 'ATX',
      maxGpuLength: 420,
      type: 'Mid Tower',
      fans: '10× 120mm',
    },
    popular: true,
  },
  {
    id: 'case-002',
    category: 'pccase',
    name: 'NZXT H7 Flow',
    brand: 'NZXT',
    price: 129,
    specs: {
      formFactor: 'ATX',
      maxGpuLength: 400,
      type: 'Mid Tower',
      fans: '7× 120mm',
    },
    popular: true,
  },
  {
    id: 'case-003',
    category: 'pccase',
    name: 'Corsair 4000D Airflow',
    brand: 'Corsair',
    price: 104,
    specs: {
      formFactor: 'ATX',
      maxGpuLength: 360,
      type: 'Mid Tower',
      fans: '6× 120mm',
    },
    popular: false,
  },
  {
    id: 'case-004',
    category: 'pccase',
    name: 'Fractal Design North',
    brand: 'Fractal Design',
    price: 139,
    specs: {
      formFactor: 'ATX',
      maxGpuLength: 355,
      type: 'Mid Tower',
      fans: '6× 140mm',
    },
    popular: false,
  },
];

// ─── PSUs ────────────────────────────────────────────────

export const psus = [
  {
    id: 'psu-001',
    category: 'psu',
    name: 'Corsair RM1000x',
    brand: 'Corsair',
    price: 189,
    specs: {
      wattage: 1000,
      efficiency: '80+ Gold',
      modular: 'Fully Modular',
      fanSize: '135mm',
    },
    popular: true,
  },
  {
    id: 'psu-002',
    category: 'psu',
    name: 'EVGA SuperNOVA 850 G7',
    brand: 'EVGA',
    price: 149,
    specs: {
      wattage: 850,
      efficiency: '80+ Gold',
      modular: 'Fully Modular',
      fanSize: '135mm',
    },
    popular: true,
  },
  {
    id: 'psu-003',
    category: 'psu',
    name: 'Seasonic Prime TX-1000',
    brand: 'Seasonic',
    price: 299,
    specs: {
      wattage: 1000,
      efficiency: '80+ Titanium',
      modular: 'Fully Modular',
      fanSize: '135mm',
    },
    popular: false,
  },
  {
    id: 'psu-004',
    category: 'psu',
    name: 'be quiet! Straight Power 12 750W',
    brand: 'be quiet!',
    price: 129,
    specs: {
      wattage: 750,
      efficiency: '80+ Platinum',
      modular: 'Fully Modular',
      fanSize: '135mm',
    },
    popular: false,
  },
];

// ─── Category → Products mapping ────────────────────────

export const productsByCategory = {
  cpu: cpus,
  gpu: gpus,
  motherboard: motherboards,
  ram: ram,
  storage: storage,
  pccase: cases,
  psu: psus,
};

/**
 * Get unique brands for a given category.
 */
export function getBrandsForCategory(category) {
  const products = productsByCategory[category] || [];
  return [...new Set(products.map((p) => p.brand))];
}

/**
 * Get the spec keys to display for a given category.
 */
export function getSpecLabels(category) {
  const labels = {
    cpu: { cores: 'Cores', threads: 'Threads', boostClock: 'Boost', tdp: 'TDP', socket: 'Socket' },
    gpu: { vram: 'VRAM', boostClock: 'Boost', tdp: 'TDP', length: 'Length' },
    motherboard: { chipset: 'Chipset', formFactor: 'Form Factor', ramType: 'RAM Type', ramSlots: 'RAM Slots' },
    ram: { capacity: 'Capacity', speed: 'Speed', type: 'Type', latency: 'Latency' },
    storage: { capacity: 'Capacity', type: 'Type', read: 'Read', write: 'Write' },
    pccase: { type: 'Type', formFactor: 'Form Factor', maxGpuLength: 'Max GPU', fans: 'Fan Support' },
    psu: { wattage: 'Wattage', efficiency: 'Efficiency', modular: 'Modular' },
  };
  return labels[category] || {};
}

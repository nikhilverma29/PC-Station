import { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Dropdown from '@/components/ui/dropdown';
import ProductCard from '@/components/cards/ProductCard';
import { useConfigurator } from '@/hooks/useConfigurator';
import {
  productsByCategory,
  getBrandsForCategory,
  STEP_LABELS,
  STEP_DESCRIPTIONS,
} from '@/data/products';

// ─── Parsing Helpers for Sorting ───────────────────────────────────────────────

function parseGHz(str) { return parseFloat(String(str || '').replace(/[^\d.]/g, '')) || 0; }
function parseVRAM(str) { return parseInt(String(str || ''), 10) || 0; }
function parseMHz(str) { return parseInt(String(str || '').replace(/[^\d]/g, ''), 10) || 0; }
function parseCL(str) { return parseInt(String(str || '').replace(/[^\d]/g, ''), 10) || 999; }
function parseSpeed(str) { return parseInt(String(str || '').replace(/[^\d]/g, ''), 10) || 0; }
function parseCapacityTB(str) {
  const match = String(str || '').match(/([\d.]+)\s*(TB|GB)/i);
  if (!match) return 0;
  const n = parseFloat(match[1]);
  return match[2].toUpperCase() === 'GB' ? n / 1024 : n;
}
function parseFanCount(str) {
  const m = String(str || '').match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}
function efficiencyTier(str) {
  const t = String(str || '').toLowerCase();
  if (t.includes('titanium')) return 4;
  if (t.includes('platinum')) return 3;
  if (t.includes('gold')) return 2;
  if (t.includes('bronze')) return 1;
  return 0;
}
function formFactorTier(str) {
  const t = String(str || '').toLowerCase();
  if (t === 'atx') return 2;
  if (t.includes('micro') || t === 'm-atx' || t === 'matx') return 1;
  if (t.includes('mini') || t === 'itx') return 0;
  return -1;
}

// ─── Sort Options Registry ───────────────────────────────────────────────────

const SORT_OPTIONS = {
  cpu: [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Performance', value: 'cpu-perf' },
    { label: 'Core Count', value: 'cpu-cores' },
    { label: 'Power Efficiency', value: 'cpu-tdp' },
  ],
  gpu: [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'VRAM: High to Low', value: 'gpu-vram' },
    { label: 'Performance', value: 'gpu-perf' },
    { label: 'Power Efficiency', value: 'gpu-tdp' },
  ],
  motherboard: [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'RAM Slots: High to Low', value: 'mobo-ram' },
    { label: 'Form Factor', value: 'mobo-form' },
  ],
  ram: [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Capacity: High to Low', value: 'ram-cap' },
    { label: 'Speed: High to Low', value: 'ram-speed' },
    { label: 'Latency: Low to High', value: 'ram-lat' },
  ],
  storage: [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Capacity: High to Low', value: 'storage-cap' },
    { label: 'Read Speed: High to Low', value: 'storage-read' },
    { label: 'Write Speed: High to Low', value: 'storage-write' },
  ],
  pccase: [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Fan Support: High to Low', value: 'case-fans' },
    { label: 'Max GPU Length: High to Low', value: 'case-gpu' },
  ],
  psu: [
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Wattage: High to Low', value: 'psu-watt' },
    { label: 'Efficiency Rating', value: 'psu-eff' },
  ]
};

/**
 * ComponentStep — A generic step page for selecting a component.
 *
 * Renders the product grid for any category with search + brand filtering + sorting.
 * Used by StepContent instead of 7 separate near-identical step components.
 */
export default function ComponentStep({ category }) {
  const { selections, dispatch } = useConfigurator();
  const [searchQuery, setSearchQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');
  const [sortBy, setSortBy] = useState('');

  const products = productsByCategory[category] || [];
  const brands = getBrandsForCategory(category);
  const selected = selections[category];
  const activeSortOptions = SORT_OPTIONS[category] || [];

  // Reset sort when switching categories
  useEffect(() => {
    setSortBy('');
  }, [category]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Search Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      );
    }

    // 2. Brand Filter
    if (brandFilter !== 'all') {
      result = result.filter((p) => p.brand === brandFilter);
    }

    // 3. Sorting
    if (sortBy) {
      result.sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;

        const sA = a.specs || {};
        const sB = b.specs || {};

        switch (sortBy) {
          // CPU
          case 'cpu-perf': return parseGHz(sB.boostClock) - parseGHz(sA.boostClock);
          case 'cpu-cores': return (sB.cores || 0) - (sA.cores || 0);
          case 'cpu-tdp': return (sA.tdp || 0) - (sB.tdp || 0);

          // GPU
          case 'gpu-vram': return parseVRAM(sB.vram) - parseVRAM(sA.vram);
          case 'gpu-perf': return parseGHz(sB.boostClock) - parseGHz(sA.boostClock);
          case 'gpu-tdp': return (sA.tdp || 0) - (sB.tdp || 0);

          // MOBO
          case 'mobo-ram': return (sB.ramSlots || 0) - (sA.ramSlots || 0);
          case 'mobo-form': return formFactorTier(sB.formFactor) - formFactorTier(sA.formFactor);

          // RAM
          case 'ram-cap': return parseCapacityTB(sB.capacity) - parseCapacityTB(sA.capacity);
          case 'ram-speed': return parseMHz(sB.speed) - parseMHz(sA.speed);
          case 'ram-lat': return parseCL(sA.latency) - parseCL(sB.latency); // Lower is better

          // STORAGE
          case 'storage-cap': return parseCapacityTB(sB.capacity) - parseCapacityTB(sA.capacity);
          case 'storage-read': return parseSpeed(sB.read) - parseSpeed(sA.read);
          case 'storage-write': return parseSpeed(sB.write) - parseSpeed(sA.write);

          // CASE
          case 'case-fans': return parseFanCount(sB.fans) - parseFanCount(sA.fans);
          case 'case-gpu': return (sB.maxGpuLength || 0) - (sA.maxGpuLength || 0);

          // PSU
          case 'psu-watt': return (sB.wattage || 0) - (sA.wattage || 0);
          case 'psu-eff': return efficiencyTier(sB.efficiency) - efficiencyTier(sA.efficiency);

          default: return 0;
        }
      });
    }

    return result;
  }, [products, searchQuery, brandFilter, sortBy]);

  function handleSelect(product) {
    if (selected?.id === product.id) {
      dispatch({ type: 'CLEAR_COMPONENT', payload: { category } });
    } else {
      dispatch({
        type: 'SELECT_COMPONENT',
        payload: { category, product },
      });
    }
  }

  return (
    <div>
      {/* Step header */}
      <div className="mb-8">
        <h2 
          className="text-4xl text-white tracking-[0.02em]"
          style={{ fontFamily: '"Zrnic", sans-serif' }}
        >
          {STEP_LABELS[category]}
        </h2>
        <div className="mt-2 flex items-center justify-between gap-4">
          <p className="text-lg text-black font-medium">
            {STEP_DESCRIPTIONS[category]}
          </p>
          
          {/* Sort By Dropdown */}
          {activeSortOptions.length > 0 && (
            <div className="shrink-0 flex items-center gap-2">
              <Dropdown
                value={sortBy}
                onChange={setSortBy}
                options={activeSortOptions}
                placeholder="Sort By"
                noneOption={true}
                className="h-9 min-w-[140px] rounded-md border border-input bg-card/60 px-3 py-1 text-sm text-white font-medium shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      {/* Filter bar */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/50" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 pl-8 text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setBrandFilter('all')}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              brandFilter === 'all'
                ? 'bg-primary/15 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            All
          </button>
          {brands.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => setBrandFilter(brand === brandFilter ? 'all' : brand)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                brandFilter === brand
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selected?.id === product.id}
              selections={selections}
              onSelect={handleSelect}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border py-12 text-center">
          <p className="text-sm text-muted-foreground">
            No products match your search.
          </p>
        </div>
      )}
    </div>
  );
}

import { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Dropdown from '@/components/ui/dropdown';
import ProductCard from '@/components/cards/ProductCard';
import LearnMoreModal from '@/components/cards/LearnMoreModal';
import { ScrambleText } from '@/components/ui/ScrambleText';
import { useConfigurator } from '@/hooks/useConfigurator';
import { getBrandsForCategory, STEP_LABELS, STEP_DESCRIPTIONS } from '@/data/products';
import { SORT_OPTIONS, sortProducts } from '@/lib/sorting';

export default function ComponentStep({ category }) {
  const { selections, dispatch, products } = useConfigurator();
  const [searchQuery, setSearchQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');
  const [sortBy, setSortBy] = useState('');
  const [learnMoreProduct, setLearnMoreProduct] = useState(null);

  const categoryProducts = products?.[category] || [];
  const brands = getBrandsForCategory(category);
  const selected = selections[category];
  const sortOptions = SORT_OPTIONS[category] || [];

  // Reset sort when the category changes so stale sort keys don't carry over
  useEffect(() => {
    setSortBy('');
  }, [category]);

  const filteredProducts = useMemo(() => {
    let result = categoryProducts;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }

    if (brandFilter !== 'all') {
      result = result.filter((p) => p.brand === brandFilter);
    }

    return sortProducts(result, sortBy);
  }, [categoryProducts, searchQuery, brandFilter, sortBy]);

  function handleSelect(product) {
    const type = selected?.id === product.id ? 'CLEAR_COMPONENT' : 'SELECT_COMPONENT';
    dispatch({ type, payload: { category, product } });
  }

  return (
    <div>
      <div className="mb-8">
        <ScrambleText
          as="h2"
          className="text-4xl text-white tracking-[0.02em]"
          style={{ fontFamily: '"Zrnic", sans-serif' }}
          text={STEP_LABELS[category]}
        />
        <div className="mt-2 flex items-center justify-between gap-4">
          <ScrambleText
            as="p"
            className="text-lg text-white font-medium tracking-[0.06em]"
            style={{ fontFamily: '"Zrnic", sans-serif' }}
            text={STEP_DESCRIPTIONS[category]}
          />
          {sortOptions.length > 0 && (
            <div className="shrink-0 flex items-center gap-2">
              <Dropdown
                value={sortBy}
                onChange={setSortBy}
                options={sortOptions}
                placeholder="Sort By"
                noneOption={true}
                className="h-7 min-w-[140px] rounded-md border-0 bg-black px-3 py-0.5 text-sm text-white font-bold shadow-sm focus:outline-none focus:ring-0 cursor-pointer border-t border-l border-r border-white"
              />
            </div>
          )}
        </div>
      </div>

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

      {filteredProducts.length > 0 ? (
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSelected={selected?.id === product.id}
              selections={selections}
              onSelect={handleSelect}
              onLearnMore={setLearnMoreProduct}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border py-12 text-center">
          <p className="text-sm text-muted-foreground">No products match your search.</p>
        </div>
      )}

      <LearnMoreModal
        product={learnMoreProduct}
        selections={selections}
        open={!!learnMoreProduct}
        onOpenChange={(open) => !open && setLearnMoreProduct(null)}
      />
    </div>
  );
}

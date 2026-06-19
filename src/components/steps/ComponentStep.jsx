import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/cards/ProductCard';
import { useConfigurator } from '@/hooks/useConfigurator';
import {
  productsByCategory,
  getBrandsForCategory,
  STEP_LABELS,
  STEP_DESCRIPTIONS,
} from '@/data/products';

/**
 * ComponentStep — A generic step page for selecting a component.
 *
 * Renders the product grid for any category with search + brand filtering.
 * Used by StepContent instead of 7 separate near-identical step components.
 */
export default function ComponentStep({ category }) {
  const { selections, dispatch } = useConfigurator();
  const [searchQuery, setSearchQuery] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');

  const products = productsByCategory[category] || [];
  const brands = getBrandsForCategory(category);
  const selected = selections[category];

  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      );
    }

    if (brandFilter !== 'all') {
      result = result.filter((p) => p.brand === brandFilter);
    }

    return result;
  }, [products, searchQuery, brandFilter]);

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
        <h2 className="text-4xl font-extrabold tracking-tight">
          {STEP_LABELS[category]}
        </h2>
        <p className="mt-2 text-lg text-black font-medium">
          {STEP_DESCRIPTIONS[category]}
        </p>
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
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

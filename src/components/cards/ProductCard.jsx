import { useMemo, useState } from 'react';
import { Check, AlertTriangle, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { getSpecLabels, CATEGORY_IMAGES } from '@/data/products';
import { checkProductCompatibility } from '@/data/compatibility';

/**
 * ProductCard — Interactive selection card for a single component.
 *
 * Shows product image, name, brand, specs, price, and compatibility status.
 * Handles selection/deselection via onClick callback.
 */
export default function ProductCard({ product, isSelected, selections, onSelect }) {
  const specLabels = getSpecLabels(product.category);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const compatibility = useMemo(
    () => checkProductCompatibility(product, selections),
    [product, selections]
  );

  const specsToShow = Object.entries(specLabels).slice(0, 4);
  const categoryImage = CATEGORY_IMAGES[product.category];

  function formatSpecValue(key, value) {
    if (key === 'wattage') return `${value}W`;
    if (key === 'length') return `${value}mm`;
    if (key === 'tdp') return `${value}W`;
    return String(value);
  }

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onSelect(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(product);
        }
      }}
      className={cn(
        'group relative cursor-pointer transition-all duration-300 ease-out backdrop-blur-xl bg-card/60 overflow-hidden p-0',
        'hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/50 hover:border-primary',
        isSelected ? 'border-primary ring-1 ring-primary bg-primary/20 shadow-md shadow-primary/10' : 'border-border/60',
        !isSelected && !compatibility.hasErrors && 'hover:bg-primary/15',
        compatibility.hasErrors && !isSelected && 'opacity-40 hover:opacity-60'
      )}
    >
      <CardContent className="p-0">
        {/* Product image area (Always rendered to maintain consistent card height) */}
        <div className="relative h-44 w-full overflow-hidden rounded-t-xl bg-muted/20 flex items-center justify-center">
          {categoryImage && !imageError ? (
            <img
              src={categoryImage}
              alt=""
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={cn(
                'h-full w-full object-cover transition-all duration-700 ease-out',
                'opacity-70 group-hover:opacity-100 group-hover:scale-105',
                isSelected && 'opacity-90',
                !imageLoaded && 'opacity-0'
              )}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground/40">
              <span className="text-xs font-semibold uppercase tracking-widest">
                {product.category}
              </span>
              <span className="text-[10px] mt-1">Image Unavailable</span>
            </div>
          )}
          
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

          {/* Status indicator — positioned over image */}
          <div className="absolute top-2.5 right-2.5">
            {isSelected ? (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-sm">
                <Check className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
            ) : compatibility.hasErrors ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive/90 shadow-sm">
                    <X className="h-3.5 w-3.5 text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs text-xs">
                  {compatibility.issues[0]?.message}
                </TooltipContent>
              </Tooltip>
            ) : compatibility.hasWarnings ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/90 shadow-sm">
                    <AlertTriangle className="h-3.5 w-3.5 text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs text-xs">
                  {compatibility.issues[0]?.message}
                </TooltipContent>
              </Tooltip>
            ) : null}
          </div>
        </div>

        {/* Card body */}
        <div className="p-4 pt-3">
          {/* Brand + badges row */}
          <div className="mb-2.5 flex items-center gap-1.5">
            <Badge variant="outline" className="text-[10px] font-normal px-1.5 py-0">
              {product.brand}
            </Badge>
            {product.popular && (
              <Badge className="bg-primary/15 text-primary hover:bg-primary/20 border-0 text-[10px] px-1.5 py-0">
                Popular
              </Badge>
            )}
          </div>

          {/* Product name */}
          <h3 className="mb-3 text-lg font-bold leading-snug text-foreground/95">
            {product.name}
          </h3>

          {/* Specs grid */}
          <div className="mb-4 grid grid-cols-2 gap-x-3 gap-y-1.5">
            {specsToShow.map(([key, label]) => (
              <div key={key} className="flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {label}
                </span>
                <span className="text-xs font-medium text-foreground/90">
                  {formatSpecValue(key, product.specs[key])}
                </span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-end justify-between border-t border-border/40 pt-4 mt-2">
            <span className="text-2xl font-extrabold tabular-nums tracking-tight">
              ${product.price.toLocaleString()}
            </span>
            {isSelected && (
              <span className="text-xs text-primary font-medium">Selected</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

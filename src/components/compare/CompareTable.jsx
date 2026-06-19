import { STEP_ORDER, STEP_LABELS } from '@/data/products';
import { cn } from '@/lib/utils';
import { Monitor } from 'lucide-react';

export default function CompareTable({ buildA, buildB }) {
  const priceDiff = buildA.totalPrice - buildB.totalPrice;
  const isACheaper = priceDiff < 0;
  const isBCheaper = priceDiff > 0;

  return (
    <div className="w-full">
      {/* Header Row */}
      <div className="grid grid-cols-[120px_1fr_1fr] sm:grid-cols-[160px_1fr_1fr] gap-4 mb-6">
        <div className="pt-4"></div>
        <div className="flex flex-col items-center p-4 rounded-xl border border-border/60 bg-card shadow-sm relative overflow-hidden">
          <div className="absolute top-0 w-full h-1 bg-primary/80"></div>
          <Monitor className="h-8 w-8 text-muted-foreground/30 mb-2" />
          <h3 className="font-bold text-center text-sm sm:text-base">{buildA.name}</h3>
        </div>
        <div className="flex flex-col items-center p-4 rounded-xl border border-border/60 bg-card shadow-sm relative overflow-hidden">
          <div className="absolute top-0 w-full h-1 bg-secondary"></div>
          <Monitor className="h-8 w-8 text-muted-foreground/30 mb-2" />
          <h3 className="font-bold text-center text-sm sm:text-base">{buildB.name}</h3>
        </div>
      </div>

      {/* Component Rows */}
      <div className="space-y-1 rounded-xl border border-border overflow-hidden">
        {STEP_ORDER.map((cat, index) => {
          const itemA = buildA.selections[cat];
          const itemB = buildB.selections[cat];
          const isEven = index % 2 === 0;

          // Simple heuristic: higher price is 'better' for a gaming PC
          const aBetter = itemA && itemB && itemA.price > itemB.price;
          const bBetter = itemA && itemB && itemB.price > itemA.price;

          return (
            <div 
              key={cat} 
              className={cn(
                "grid grid-cols-[120px_1fr_1fr] sm:grid-cols-[160px_1fr_1fr] items-stretch",
                isEven ? "bg-muted/30" : "bg-background"
              )}
            >
              <div className="p-3 sm:p-4 border-r border-border/50 flex items-center">
                <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-muted-foreground">{STEP_LABELS[cat]}</span>
              </div>
              
              <div className={cn("p-3 sm:p-4 border-r border-border/50", aBetter && "bg-primary/5")}>
                {itemA ? (
                  <div>
                    <div className="font-medium text-sm sm:text-base mb-1">{itemA.name}</div>
                    <div className="text-xs text-muted-foreground">${itemA.price}</div>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground italic">—</span>
                )}
              </div>
              
              <div className={cn("p-3 sm:p-4", bBetter && "bg-secondary/20")}>
                {itemB ? (
                  <div>
                    <div className="font-medium text-sm sm:text-base mb-1">{itemB.name}</div>
                    <div className="text-xs text-muted-foreground">${itemB.price}</div>
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground italic">—</span>
                )}
              </div>
            </div>
          );
        })}

        {/* Total Price Row */}
        <div className="grid grid-cols-[120px_1fr_1fr] sm:grid-cols-[160px_1fr_1fr] items-stretch border-t-2 border-border/80 bg-muted/10">
          <div className="p-4 border-r border-border/50 flex items-center">
            <span className="text-sm font-bold uppercase tracking-wider">Total Price</span>
          </div>
          <div className={cn("p-4 border-r border-border/50 flex flex-col justify-center", isACheaper && "bg-emerald-500/10")}>
            <span className="text-lg sm:text-xl font-bold tabular-nums">${buildA.totalPrice.toLocaleString()}</span>
            {isACheaper && <span className="text-xs text-emerald-500 font-medium">Cheaper by ${Math.abs(priceDiff).toLocaleString()}</span>}
          </div>
          <div className={cn("p-4 flex flex-col justify-center", isBCheaper && "bg-emerald-500/10")}>
            <span className="text-lg sm:text-xl font-bold tabular-nums">${buildB.totalPrice.toLocaleString()}</span>
            {isBCheaper && <span className="text-xs text-emerald-500 font-medium">Cheaper by ${Math.abs(priceDiff).toLocaleString()}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

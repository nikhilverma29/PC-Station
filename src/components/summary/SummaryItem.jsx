import { cn } from '@/lib/utils';
import { AlertTriangle, X } from 'lucide-react';
import { useConfigurator } from '@/hooks/useConfigurator';
import { useMemo } from 'react';

export default function SummaryItem({ category, label, item, onClick }) {
  const { compatibilityIssues } = useConfigurator();

  const issues = useMemo(() => {
    return compatibilityIssues.filter(i => i.affectedComponents.includes(category));
  }, [compatibilityIssues, category]);

  const hasError = issues.some(i => i.type === 'error');
  const hasWarning = issues.some(i => i.type === 'warning');

  return (
    <div 
      className={cn(
        "group flex items-center justify-between py-1.5 cursor-pointer rounded-md px-2 -mx-2 transition-colors hover:bg-secondary/50",
        !item && "opacity-60"
      )}
      onClick={onClick}
    >
      <div className="flex flex-col min-w-0 pr-4">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/80 mb-0.5">
          {label}
        </span>
        <div className="flex items-center gap-1.5">
          <span className={cn(
            "text-sm truncate font-medium",
            !item && "text-muted-foreground font-normal italic"
          )}>
            {item ? item.name : 'Not selected'}
          </span>
          {item && hasError && <X className="h-3 w-3 text-destructive shrink-0" />}
          {item && !hasError && hasWarning && <AlertTriangle className="h-3 w-3 text-amber-400 shrink-0" />}
        </div>
      </div>
      
      <div className="text-right shrink-0">
        <span className={cn(
          "text-sm tabular-nums",
          item ? "font-semibold text-foreground" : "text-muted-foreground"
        )}>
          {item ? `$${item.price}` : '—'}
        </span>
      </div>
    </div>
  );
}

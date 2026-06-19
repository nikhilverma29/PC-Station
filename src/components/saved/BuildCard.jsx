import { Download, Trash2, GitCompare, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useConfigurator } from '@/hooks/useConfigurator';
import { STEP_ORDER } from '@/data/products';

export default function BuildCard({ build, onDrawerClose }) {
  const { compareList, dispatch } = useConfigurator();
  const isComparing = compareList.includes(build.id);
  const canCompare = compareList.length < 2 || isComparing;

  function handleLoad() {
    if (confirm('Load this build? Current unsaved progress will be lost.')) {
      dispatch({ type: 'LOAD_BUILD', payload: { buildId: build.id } });
      onDrawerClose();
    }
  }

  function handleDelete() {
    if (confirm('Are you sure you want to delete this saved build?')) {
      dispatch({ type: 'DELETE_BUILD', payload: { buildId: build.id } });
    }
  }

  function handleCompare() {
    dispatch({ type: 'TOGGLE_COMPARE', payload: { buildId: build.id } });
  }

  const dateStr = new Date(build.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-center justify-between bg-muted/40 px-4 py-3 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-background border border-border">
              <Monitor className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">{build.name}</h4>
              <p className="text-[11px] text-muted-foreground">{dateStr}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="font-bold tabular-nums text-foreground">
              ${build.totalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="px-4 py-3 flex flex-col gap-1.5">
          {STEP_ORDER.map((cat) => {
            const item = build.selections[cat];
            if (!item) return null;
            return (
              <div key={cat} className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground truncate pr-2 max-w-[200px]">{item.name}</span>
                <span className="tabular-nums text-muted-foreground/70">${item.price}</span>
              </div>
            );
          })}
        </div>

        <div className="bg-muted/20 px-4 py-2 border-t border-border/50 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCompare}
            disabled={!canCompare}
            className={`h-7 px-2 text-xs gap-1.5 ${isComparing ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}
          >
            <GitCompare className="h-3.5 w-3.5" />
            {isComparing ? 'Comparing' : 'Compare'}
          </Button>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={handleDelete}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
            <Button size="sm" className="h-7 px-3 text-xs gap-1.5" onClick={handleLoad}>
              <Download className="h-3 w-3" />
              Load
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

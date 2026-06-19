import { GitCompare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import CompareTable from './CompareTable';
import { useConfigurator } from '@/hooks/useConfigurator';

export default function CompareModal({ open, onOpenChange }) {
  const { savedBuilds, compareList } = useConfigurator();

  // Get full build objects based on the IDs in compareList
  const buildsToCompare = compareList
    .map(id => savedBuilds.find(b => b.id === id))
    .filter(Boolean);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden gap-0 bg-background/95 backdrop-blur-xl border-border/60">
        <DialogHeader className="p-5 border-b border-border/50 bg-card/50">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <GitCompare className="h-5 w-5 text-primary" />
            Build Comparison
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh]">
          <div className="p-5">
            {buildsToCompare.length === 2 ? (
              <CompareTable buildA={buildsToCompare[0]} buildB={buildsToCompare[1]} />
            ) : (
              <div className="py-10 text-center">
                <p className="text-muted-foreground">Select two builds from the Saved Builds drawer to compare them.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

import { useState, useEffect } from 'react';
import { GitCompare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X as XIcon } from 'lucide-react';
import CompareTable from './CompareTable';
import { useConfigurator } from '@/hooks/useConfigurator';
import Dropdown from '@/components/ui/dropdown';

const SELECT_CLS =
  'h-10 rounded-md border border-primary px-3 py-2 text-sm text-foreground focus:outline-none w-56 [&_svg]:text-primary [&_svg]:opacity-100';

export default function CompareModal({ open, onOpenChange }) {
  const { savedBuilds } = useConfigurator();

  const [buildAId, setBuildAId] = useState('');
  const [buildBId, setBuildBId] = useState('');
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    if (open) {
      setBuildAId('');
      setBuildBId('');
      setShowTable(false);
      if (savedBuilds.length >= 2) {
        setBuildAId(savedBuilds[0].id);
        setBuildBId(savedBuilds[1].id);
      }
    }
  }, [open, savedBuilds]);

  const buildA = savedBuilds.find((b) => b.id === buildAId);
  const buildB = savedBuilds.find((b) => b.id === buildBId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex flex-col p-0 gap-0 bg-[#0f0f11] backdrop-blur-xl border-border/60 sm:rounded-3xl overflow-hidden min-w-[85vw] w-[90vw] min-h-[80vh] h-[85vh]"
      >
        <DialogClose className="absolute top-5 right-5 z-50 p-2 outline-none border-none hover:bg-transparent">
          <XIcon className="h-8 w-8 text-red-500" />
        </DialogClose>
        {/* ── Fixed top bar: title + dropdowns + button on one line ── */}
        <div className="flex-shrink-0 border-b border-border/50 bg-card/60 px-6 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
            {/* Title (Far Left) */}
            <div className="flex items-center gap-2 shrink-0">
              <GitCompare className="h-6 w-6 text-primary" />
              <span 
                className="text-3xl tracking-[0.02em] text-white whitespace-nowrap"
                style={{ fontFamily: '"Zrnic", sans-serif' }}
              >
                Build Comparison
              </span>
            </div>

            {savedBuilds.length < 2 ? null : (
              <div className="flex items-center gap-3 shrink-0 ml-auto pr-12">
                {/* Build A dropdown */}
                <Dropdown
                  value={buildAId}
                  onChange={(val) => { setBuildAId(val); setShowTable(false); }}
                  options={savedBuilds.map((b) => {
                    const d = new Date(b.date);
                    const ds = `[${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}]`;
                    return { 
                      value: b.id, 
                      label: (
                        <span className="flex items-center gap-2">
                          <span className="truncate">{b.name}</span>
                          <span className="text-white/40 text-xs shrink-0">{ds}</span>
                        </span>
                      ) 
                    };
                  })}
                  placeholder="Select a build…"
                  className={SELECT_CLS}
                />

                {/* Build B dropdown */}
                <Dropdown
                  value={buildBId}
                  onChange={(val) => { setBuildBId(val); setShowTable(false); }}
                  options={savedBuilds.map((b) => {
                    const d = new Date(b.date);
                    const ds = `[${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}]`;
                    return { 
                      value: b.id, 
                      label: (
                        <span className="flex items-center gap-2">
                          <span className="truncate">{b.name}</span>
                          <span className="text-white/40 text-xs shrink-0">{ds}</span>
                        </span>
                      ) 
                    };
                  })}
                  placeholder="Select a build…"
                  className={SELECT_CLS}
                />

                {/* Compare button */}
                <Button
                  variant="ghost"
                  onClick={() => setShowTable(true)}
                  disabled={!buildAId || !buildBId || buildAId === buildBId}
                  className="h-10 px-6 whitespace-nowrap text-base font-bold bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
                >
                  Compare Builds
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* ── Scrollable table area ── */}
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain"
        >
          {savedBuilds.length < 2 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-12">
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <GitCompare className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <p className="text-lg font-medium text-foreground">Not Enough Builds</p>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                You need at least 2 saved builds to use the compare feature. Go back and save another build first.
              </p>
            </div>
          ) : !showTable && buildAId === buildBId ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-12">
              <p className="text-lg font-medium text-destructive">
                Please select two different builds to compare
              </p>
            </div>
          ) : showTable && buildA && buildB ? (
            <div className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CompareTable buildA={buildA} buildB={buildB} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-12">
              <GitCompare className="h-12 w-12 text-muted-foreground/20 mb-4" />
              <p className="text-muted-foreground">Select two builds above and click Compare Builds.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

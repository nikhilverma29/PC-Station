import { Download, Trash2, GitCompare, Monitor, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useConfigurator } from '@/hooks/useConfigurator';
import { useCurrency } from '@/hooks/useCurrency';
import { STEP_ORDER } from '@/data/products';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function BuildCard({ build, onDrawerClose, onActiveDeleted }) {
  const { compareList, dispatch, editingBuildId } = useConfigurator();
  const { formatPrice } = useCurrency();
  const isComparing = compareList.includes(build.id);
  const canCompare = compareList.length < 2 || isComparing;
  
  const [loadConfirmOpen, setLoadConfirmOpen] = useState(false);
  const [editConfirmOpen, setEditConfirmOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  function handleLoad(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    dispatch({ type: 'LOAD_BUILD', payload: { buildId: build.id } });
    setLoadConfirmOpen(false);
    if (onDrawerClose) onDrawerClose();
  }

  function handleEdit(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    dispatch({ type: 'LOAD_BUILD_FOR_EDIT', payload: { buildId: build.id } });
    setEditConfirmOpen(false);
    if (onDrawerClose) onDrawerClose();
  }

  function handleDelete(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (editingBuildId === build.id && onActiveDeleted) {
      onActiveDeleted();
    }
    dispatch({ type: 'DELETE_BUILD', payload: { buildId: build.id } });
    setDeleteConfirmOpen(false);
  }

  function handleCompare() {
    dispatch({ type: 'TOGGLE_COMPARE', payload: { buildId: build.id } });
  }

  const d = new Date(build.date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const dateStr = `[${day}-${month}-${year}]`;

  return (
    /*
      Outer wrapper: handles the hover transform.
      overflow-visible ensures the border is NOT clipped during scale.
    */
    <div
      className="transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl overflow-visible group"
    >
      {/* Inner card: much brighter border that thickens on hover */}
      <div
        className="rounded-xl border border-[#5a3f18] group-hover:border-[3px] group-hover:border-[#6b4d20] overflow-hidden bg-black transition-all duration-300"
      >
        {/* Card header */}
        <div className="flex items-center justify-between bg-black px-4 py-3 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-background border border-border">
              <Monitor className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-white">{build.name}</h4>
              <p className="text-[11px] text-muted-foreground">{dateStr}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="font-bold tabular-nums text-white">
              {formatPrice(build.totalPrice)}
            </span>
          </div>
        </div>

        {/* Component list */}
        <div className="px-4 py-3 flex flex-col gap-1.5">
          {STEP_ORDER.map((cat) => {
            const item = build.selections[cat];
            if (!item) return null;
            return (
              <div key={cat} className="flex justify-between items-center text-xs">
                <span className="text-white truncate pr-2 max-w-[200px]">{item.name}</span>
                <span className="tabular-nums text-white">{formatPrice(item.price)}</span>
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="bg-black px-4 py-2 border-t border-border/50 flex items-center justify-between">
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
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10" onClick={() => setDeleteConfirmOpen(true)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              className="h-6 px-3 text-xs gap-1.5 bg-black border border-gray-600 hover:bg-black/90" 
              onClick={() => setEditConfirmOpen(true)}
            >
              <Edit2 className="h-3 w-3" />
              Edit
            </Button>
            <Button 
              size="sm" 
              className="h-6 px-3 text-xs gap-1.5 bg-[#181002] text-[#C47F10] hover:bg-[#181002]/90" 
              onClick={() => setLoadConfirmOpen(true)}
            >
              <Download className="h-3 w-3" />
              Load
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={loadConfirmOpen} onOpenChange={setLoadConfirmOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Load Build?</DialogTitle>
            <DialogDescription>
              Loading this build will replace your current unsaved selections. Are you sure you want to continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setLoadConfirmOpen(false)} onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); setLoadConfirmOpen(false); }}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleLoad} onPointerDown={handleLoad}>
              Yes, Load Build
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editConfirmOpen} onOpenChange={setEditConfirmOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Build?</DialogTitle>
            <DialogDescription>
              Editing this build will load its components and replace your current unsaved selections. Saving changes will overwrite this build. Are you sure you want to continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setEditConfirmOpen(false)} onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); setEditConfirmOpen(false); }}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleEdit} onPointerDown={handleEdit}>
              Yes, Edit Build
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Build?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this saved build? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setDeleteConfirmOpen(false)} onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); setDeleteConfirmOpen(false); }}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete} onPointerDown={handleDelete}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

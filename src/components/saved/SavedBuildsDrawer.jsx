import { Save } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { useConfigurator } from '@/hooks/useConfigurator';
import BuildCard from './BuildCard';

import { useState, useEffect } from 'react';

export default function SavedBuildsDrawer({ open, onOpenChange }) {
  const { savedBuilds, editingBuildId } = useConfigurator();
  const [deletedActiveNotice, setDeletedActiveNotice] = useState(false);

  // Clear notice when drawer is closed or another build is edited
  useEffect(() => {
    if (!open || editingBuildId) {
      setDeletedActiveNotice(false);
    }
  }, [open, editingBuildId]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-full sm:w-[400px] rounded-none flex flex-col overflow-hidden">
        {/* Fixed header — does not scroll */}
        <DrawerHeader className="flex-shrink-0 border-b border-border/50 bg-muted/10">
          <DrawerTitle 
            className="flex items-center gap-2 text-2xl tracking-[0.02em]"
            style={{ fontFamily: '"Zrnic", sans-serif' }}
          >
            <Save className="h-6 w-6 text-primary" />
            Saved Builds
          </DrawerTitle>
          <DrawerDescription>
            View and load your previously saved configurations.
          </DrawerDescription>
        </DrawerHeader>

        {/* Scrollable build list — explicit overflow-y: auto with max-height */}
        <div
          className="flex-1 p-4 overflow-y-auto overflow-x-hidden overscroll-contain max-h-[calc(100vh-80px)]"
        >
          {deletedActiveNotice && (
            <div className="mb-4 rounded-md bg-amber-500/10 border border-amber-500/20 p-3">
              <p className="text-sm text-amber-500/90">
                The active build was deleted. Your current selections remain but are no longer saved.
              </p>
            </div>
          )}
          {savedBuilds.length > 0 ? (
            <div className="flex flex-col gap-4 pb-4">
              {savedBuilds.map((build) => (
                <BuildCard
                  key={build.id}
                  build={build}
                  onDrawerClose={() => onOpenChange(false)}
                  onActiveDeleted={() => setDeletedActiveNotice(true)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center px-4">
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                <Save className="h-5 w-5 text-muted-foreground/50" />
              </div>
              <p className="text-sm font-medium text-foreground">No saved builds</p>
              <p className="text-xs text-muted-foreground mt-1">
                Complete a configuration and save it to see it here.
              </p>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

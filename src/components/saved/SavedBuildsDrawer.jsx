import { Save } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useConfigurator } from '@/hooks/useConfigurator';
import BuildCard from './BuildCard';

export default function SavedBuildsDrawer({ open, onOpenChange }) {
  const { savedBuilds } = useConfigurator();

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-full sm:w-[400px] rounded-none">
        <DrawerHeader className="border-b border-border/50 bg-muted/10">
          <DrawerTitle className="flex items-center gap-2">
            <Save className="h-5 w-5 text-primary" />
            Saved Builds
          </DrawerTitle>
          <DrawerDescription>
            View and load your previously saved configurations.
          </DrawerDescription>
        </DrawerHeader>
        
        <ScrollArea className="flex-1 p-4">
          {savedBuilds.length > 0 ? (
            <div className="flex flex-col gap-4">
              {savedBuilds.map((build) => (
                <BuildCard 
                  key={build.id} 
                  build={build} 
                  onDrawerClose={() => onOpenChange(false)}
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
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

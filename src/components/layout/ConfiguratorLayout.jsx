import { useState } from 'react';
import { PanelRightOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import StepperNav from '@/components/stepper/StepperNav';
import StepContent from '@/components/stepper/StepContent';
import StepControls from '@/components/stepper/StepControls';
import SummaryPanel from '@/components/summary/SummaryPanel';
import { useConfigurator } from '@/hooks/useConfigurator';

export default function ConfiguratorLayout() {
  const { totalPrice, completedSteps } = useConfigurator();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <main className="mx-auto max-w-[1920px] px-4 pb-8 sm:px-6 lg:pl-8 lg:pr-12 xl:pl-12 xl:pr-16 pt-0">
      {/* Two-column layout */}
      <div className="flex w-full gap-8 lg:gap-10 xl:gap-12">
        {/* Main content area */}
        <div className="min-w-0 flex-1 pt-8">
          {/* Stepper Navigation */}
          <StepperNav />
          <div className="mt-8">
            <StepContent />
            <StepControls />
          </div>
        </div>

        {/* Sticky summary panel — desktop only */}
        <aside className="hidden w-80 lg:w-[380px] shrink-0 lg:block mt-6 relative right-4 lg:right-6 xl:right-8">
          <div className="sticky top-6" style={{maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto'}}>
            <SummaryPanel />
          </div>
        </aside>
      </div>

      {/* Mobile summary — fixed bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-sm p-3 lg:hidden">
        <div className="mx-auto flex max-w-[1920px] items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">
              {completedSteps.length} of 7 selected
            </p>
            <p className="text-lg font-semibold tabular-nums">
              ${totalPrice.toLocaleString()}
            </p>
          </div>

          <Drawer open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <PanelRightOpen className="h-4 w-4" />
                View Summary
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[85vh]">
              <DrawerHeader>
                <DrawerTitle>Build Summary</DrawerTitle>
              </DrawerHeader>
              <div className="overflow-y-auto px-4 pb-6">
                <SummaryPanel />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      {/* Spacer for mobile bottom bar */}
      <div className="h-20 lg:hidden" />
    </main>
  );
}

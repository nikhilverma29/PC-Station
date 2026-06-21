import { useState } from 'react';
import { Zap, Save, GitCompare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Dropdown from '@/components/ui/dropdown';
import { useConfigurator } from '@/hooks/useConfigurator';
import { useCurrency } from '@/hooks/useCurrency';
import SavedBuildsDrawer from '@/components/saved/SavedBuildsDrawer';
import CompareModal from '@/components/compare/CompareModal';

export default function Header() {
  const { savedBuilds, compareList } = useConfigurator();
  const { currency, setCurrency } = useCurrency();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);

  return (
    <>
      <header className="relative w-full bg-transparent pt-3">
        <div className="mx-auto flex h-14 max-w-[1920px] items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Logo aligned to left edge */}
          <div className="flex items-center gap-3 pl-0 lg:pl-2 xl:pl-4 pt-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <span 
              className="text-5xl tracking-[0.05em] text-white" 
              style={{ fontFamily: '"Zrnic", sans-serif' }}
            >
              PC Station
            </span>
          </div>

          {/* Right side links aligned to purple line */}
          {/* Right side links - Compare button right edge touches purple line */}
          <nav className="flex items-center gap-2 pr-0 lg:-mr-5 xl:-mr-7">
            <Dropdown
              value={currency}
              onChange={setCurrency}
              options={[
                { value: 'USD', label: '$ USD' },
                { value: 'EUR', label: '€ EUR' },
                { value: 'GBP', label: '£ GBP' },
                { value: 'INR', label: '₹ INR' },
                { value: 'CAD', label: 'C$ CAD' },
                { value: 'AUD', label: 'A$ AUD' },
                { value: 'JPY', label: '¥ JPY' },
              ]}
              className="h-7 min-w-[100px] rounded-md border-0 bg-black px-3 py-0 text-sm text-white font-bold shadow-sm focus:outline-none focus:ring-0 cursor-pointer gap-0.5 border-t border-l border-r border-white"
            />

            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-2 bg-black text-white font-bold hover:bg-black hover:text-white rounded-md px-3 cursor-pointer border-t border-l border-r border-b-0 border-white"
              onClick={() => setDrawerOpen(true)}
            >
              <Save className="h-4 w-4 text-white" />
              <span className="hidden sm:inline text-base">Saved Builds</span>
              {savedBuilds.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 h-5 min-w-5 justify-center rounded-full px-1.5 text-xs"
                >
                  {savedBuilds.length}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-2 bg-black text-white font-bold hover:bg-black hover:text-white rounded-md px-3 cursor-pointer border-t border-l border-r border-b-0 border-white"
              onClick={() => setCompareOpen(true)}
            >
              <GitCompare className="h-4 w-4 text-white" />
              <span className="hidden sm:inline text-base">Compare</span>
            </Button>
          </nav>
        </div>
      </header>

      <SavedBuildsDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
      <CompareModal open={compareOpen} onOpenChange={setCompareOpen} />
    </>
  );
}

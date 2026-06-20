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
      <header className="relative w-full bg-transparent">
        <div className="mx-auto flex h-14 max-w-[1920px] items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Logo with left padding for spacing */}
          <div className="flex items-center gap-2 pl-2 lg:pl-6 xl:pl-10">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <span 
              className="text-4xl tracking-[0.05em] text-white" 
              style={{ fontFamily: '"Zrnic", sans-serif' }}
            >
              PC Station
            </span>
          </div>

          {/* Right side links with right padding for spacing */}
          <nav className="flex items-center gap-2 pr-2 lg:pr-6 xl:pr-10">
            <div className="mr-2">
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
                className="h-8 rounded-md border border-input bg-background px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground hover:text-foreground"
              onClick={() => setDrawerOpen(true)}
            >
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">Saved Builds</span>
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
              className="gap-2 text-muted-foreground hover:text-foreground"
              onClick={() => setCompareOpen(true)}
            >
              <GitCompare className="h-4 w-4" />
              <span className="hidden sm:inline">Compare</span>
            </Button>
          </nav>
        </div>
      </header>

      <SavedBuildsDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
      <CompareModal open={compareOpen} onOpenChange={setCompareOpen} />
    </>
  );
}

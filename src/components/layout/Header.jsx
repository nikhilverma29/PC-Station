import { useState } from 'react';
import { Zap, Save, GitCompare, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Dropdown from '@/components/ui/dropdown';
import { useConfigurator } from '@/hooks/useConfigurator';
import { useCurrency } from '@/hooks/useCurrency';
import { useAuth } from '@/context/AuthContext';
import SavedBuildsDrawer from '@/components/saved/SavedBuildsDrawer';
import CompareModal from '@/components/compare/CompareModal';

export default function Header({ onLoginClick }) {
  const { savedBuilds, compareList } = useConfigurator();
  const { currency, setCurrency } = useCurrency();
  const { user, isLoggedIn, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  // Derive initials from name — e.g. "Nikhil Verma" → "NV"
  const initials = user?.name
    ?.split(' ')
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .join('')
    .slice(0, 2) || '?';

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

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                {/* Initials avatar */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary bg-primary/10 text-sm font-bold text-primary">
                  {initials}
                </div>

                {/* Logout — circle at rest, expands to pill on hover */}
                <button
                  onClick={() => setLogoutConfirm(true)}
                  className="group flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-red-500/30 bg-red-500/10 text-red-400 transition-all duration-300 ease-in-out hover:w-[95px] hover:gap-1.5 hover:px-3 hover:bg-red-500/20 hover:text-red-300 cursor-pointer"
                >
                  <LogOut className="h-4 w-4 shrink-0" />
                  <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium transition-all duration-300 ease-in-out group-hover:max-w-[60px]">
                    Logout
                  </span>
                </button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={onLoginClick}
                className="h-7 gap-2 bg-primary/10 text-primary font-bold hover:bg-primary/10 hover:text-primary rounded-md px-3 cursor-pointer border-t border-l border-r border-b-0 border-primary"
              >
                <LogIn className="h-4 w-4 text-primary" />
                <span className="hidden sm:inline text-base">Login</span>
              </Button>
            )}
          </nav>
        </div>
      </header>

      <SavedBuildsDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
      <CompareModal open={compareOpen} onOpenChange={setCompareOpen} />

      {logoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setLogoutConfirm(false)}
          />
          {/* Dialog */}
          <div className="relative z-10 w-full max-w-xs rounded-2xl border border-white/10 bg-black p-6 shadow-2xl">
            <h3
              className="text-2xl font-normal text-white text-center tracking-[0.03em]"
              style={{ fontFamily: '"Zrnic", sans-serif' }}
            >
              Log Out?
            </h3>
            <p className="mt-2 text-center text-sm text-white/40">
              Are you sure you want to log out?
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setLogoutConfirm(false)}
                className="flex-1 rounded-lg border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white/60 transition hover:bg-white/10 hover:text-white cursor-pointer"
              >
                Stay
              </button>
              <button
                onClick={() => { logout(); setLogoutConfirm(false); }}
                className="flex-1 rounded-lg border border-red-500/30 bg-red-500/10 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/20 hover:text-red-300 cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

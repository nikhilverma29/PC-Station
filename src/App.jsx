import { useState } from 'react';
import { ConfiguratorProvider } from '@/context/ConfiguratorContext';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ConfiguratorLayout from '@/components/layout/ConfiguratorLayout';
import { TooltipProvider } from '@/components/ui/tooltip';
import AuthModal from '@/components/auth/AuthModal';

function App() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <TooltipProvider>
      <AuthProvider>
        <ConfiguratorProvider>
          <div className="flex min-h-screen flex-col bg-transparent text-foreground">
            <Header onLoginClick={() => setAuthOpen(true)} />
            <ConfiguratorLayout />
            <Footer />
          </div>
          <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
        </ConfiguratorProvider>
      </AuthProvider>
    </TooltipProvider>
  );
}

export default App;

import { ConfiguratorProvider } from '@/context/ConfiguratorContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ConfiguratorLayout from '@/components/layout/ConfiguratorLayout';
import { TooltipProvider } from '@/components/ui/tooltip';

function App() {
  return (
    <TooltipProvider>
      <ConfiguratorProvider>
        <div className="flex min-h-screen flex-col bg-transparent text-foreground">
          <Header />
          <ConfiguratorLayout />
          <Footer />
        </div>
      </ConfiguratorProvider>
    </TooltipProvider>
  );
}

export default App;

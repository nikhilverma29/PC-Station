import { useContext } from 'react';
import { ConfiguratorContext } from '@/context/ConfiguratorContext';

/**
 * Shortcut hook for accessing configurator state and dispatch.
 */
export function useConfigurator() {
  const context = useContext(ConfiguratorContext);
  if (!context) {
    throw new Error('useConfigurator must be used within a ConfiguratorProvider');
  }
  return context;
}

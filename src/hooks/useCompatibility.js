import { useMemo } from 'react';
import { checkCompatibility, checkProductCompatibility } from '@/data/compatibility';

/**
 * Hook that returns compatibility analysis for the current selections.
 */
export function useCompatibility(selections) {
  const issues = useMemo(() => checkCompatibility(selections), [selections]);

  const errors = issues.filter((i) => i.type === 'error');
  const warnings = issues.filter((i) => i.type === 'warning');

  return {
    issues,
    errors,
    warnings,
    hasErrors: errors.length > 0,
    hasWarnings: warnings.length > 0,
    isValid: errors.length === 0,
  };
}

/**
 * Check compatibility for a single product against current selections.
 */
export function useProductCompatibility(product, selections) {
  return useMemo(
    () => checkProductCompatibility(product, selections),
    [product, selections]
  );
}

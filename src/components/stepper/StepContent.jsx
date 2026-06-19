import { STEP_ORDER } from '@/data/products';
import { useConfigurator } from '@/hooks/useConfigurator';
import ComponentStep from '@/components/steps/ComponentStep';
import ReviewStep from '@/components/steps/ReviewStep';

export default function StepContent() {
  const { currentStep } = useConfigurator();

  // Review step is the last one
  if (currentStep >= STEP_ORDER.length) {
    return <ReviewStep />;
  }

  const category = STEP_ORDER[currentStep];

  return <ComponentStep key={category} category={category} />;
}

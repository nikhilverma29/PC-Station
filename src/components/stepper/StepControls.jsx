import { ChevronLeft, ChevronRight, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConfigurator } from '@/hooks/useConfigurator';
import { STEP_ORDER } from '@/data/products';

export default function StepControls() {
  const { currentStep, dispatch } = useConfigurator();

  const isFirstStep = currentStep === 0;
  const isReviewStep = currentStep >= STEP_ORDER.length;
  const isLastComponentStep = currentStep === STEP_ORDER.length - 1;

  function handleBack() {
    dispatch({ type: 'PREV_STEP' });
  }

  function handleNext() {
    dispatch({ type: 'NEXT_STEP' });
  }

  // Don't show controls on the review step (it has its own actions)
  if (isReviewStep) return null;

  return (
    <div className="mt-6 flex items-center justify-between">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleBack}
        disabled={isFirstStep}
        className="gap-2 text-muted-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>

      <Button
        variant={isLastComponentStep ? 'default' : 'ghost'}
        size="sm"
        onClick={handleNext}
        className={isLastComponentStep ? 'gap-2' : 'gap-2 text-muted-foreground'}
      >
        {isLastComponentStep ? (
          <>
            Review Build
            <ClipboardCheck className="h-4 w-4" />
          </>
        ) : (
          <>
            Next
            <ChevronRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}

import {
  Cpu,
  MonitorSpeaker,
  CircuitBoard,
  MemoryStick,
  HardDrive,
  Box,
  Plug,
  ClipboardCheck,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useConfigurator } from '@/hooks/useConfigurator';
import { STEP_ORDER, STEP_LABELS } from '@/data/products';

const stepIcons = {
  cpu: Cpu,
  gpu: MonitorSpeaker,
  motherboard: CircuitBoard,
  ram: MemoryStick,
  storage: HardDrive,
  pccase: Box,
  psu: Plug,
};

export default function StepperNav() {
  const { currentStep, selections, completedSteps, compatibilityIssues, dispatch } =
    useConfigurator();

  const allSteps = [...STEP_ORDER, 'review'];

  function getStepStatus(index) {
    if (index === allSteps.length - 1) {
      // Review step
      return currentStep === index ? 'current' : currentStep > index ? 'completed' : 'upcoming';
    }

    const category = allSteps[index];
    const isSelected = selections[category] !== null;
    const hasIssue = compatibilityIssues.some((issue) =>
      issue.affectedComponents.includes(category)
    );

    if (index === currentStep) return 'current';
    if (isSelected && hasIssue) return 'warning';
    if (isSelected) return 'completed';
    return 'upcoming';
  }

  function handleStepClick(index) {
    dispatch({ type: 'SET_STEP', payload: index });
  }

  return (
    <nav className="w-full overflow-x-auto" aria-label="Build steps">
      <div className="flex items-center gap-0 min-w-max px-1 py-2">
        {allSteps.map((step, index) => {
          const status = getStepStatus(index);
          const Icon = step === 'review' ? ClipboardCheck : stepIcons[step];
          const label = step === 'review' ? 'Review' : STEP_LABELS[step];

          return (
            <div key={step} className="flex items-center">
              {/* Step indicator */}
              <button
                type="button"
                onClick={() => handleStepClick(index)}
                className={cn(
                  'group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                  status === 'current' &&
                    'bg-primary/10 text-primary',
                  status === 'completed' &&
                    'text-foreground hover:bg-secondary/80',
                  status === 'warning' &&
                    'text-amber-400 hover:bg-amber-400/10',
                  status === 'upcoming' &&
                    'text-muted-foreground/50 hover:text-muted-foreground hover:bg-secondary/50'
                )}
                aria-current={status === 'current' ? 'step' : undefined}
              >
                <div
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-md transition-colors border-t border-l border-r border-b-0 border-white',
                    status === 'current' && 'bg-black text-white',
                    status === 'completed' && 'bg-black text-white',
                    status === 'warning' && 'bg-black text-white',
                    status === 'upcoming' && 'bg-black text-white'
                  )}
                >
                  {status === 'completed' ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : status === 'warning' ? (
                    <AlertTriangle className="h-3.5 w-3.5" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                </div>
                <span className="hidden font-medium sm:inline">{label}</span>
              </button>

              {/* Connector line */}
              {index < allSteps.length - 1 && (
                <div
                  className={cn(
                    'mx-1 h-px w-6 transition-colors',
                    index < currentStep ? 'bg-primary/40' : 'bg-border'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

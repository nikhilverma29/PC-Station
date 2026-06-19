import { useMemo, useState } from 'react';
import {
  Save,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Zap,
  Plug,
  Loader2,
  CircleCheck,
  ShieldAlert,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useConfigurator } from '@/hooks/useConfigurator';
import { STEP_ORDER, STEP_LABELS } from '@/data/products';
import { getPowerAnalysis } from '@/data/compatibility';
import SummaryItem from './SummaryItem';
import PriceDisplay from './PriceDisplay';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function SummaryPanel() {
  const { selections, totalPrice, compatibilityIssues, completedSteps, dispatch } = useConfigurator();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [buildName, setBuildName] = useState('');

  const hasSelections = completedSteps.length > 0;
  const isComplete = completedSteps.length === STEP_ORDER.length;
  const errors = compatibilityIssues.filter(i => i.type === 'error');
  const warnings = compatibilityIssues.filter(i => i.type === 'warning');
  const progressPercent = (completedSteps.length / STEP_ORDER.length) * 100;

  const powerAnalysis = useMemo(
    () => getPowerAnalysis(selections),
    [selections]
  );

  // Determine build status
  const buildStatus = useMemo(() => {
    if (errors.length > 0) {
      return { label: 'Compatibility Issues Detected', color: 'text-destructive', icon: ShieldAlert, bg: 'bg-destructive/10' };
    }
    if (warnings.length > 0 && isComplete) {
      return { label: 'Review Warnings Before Saving', color: 'text-amber-400', icon: AlertTriangle, bg: 'bg-amber-400/10' };
    }
    if (isComplete) {
      return { label: 'Ready For Review', color: 'text-emerald-400', icon: CircleCheck, bg: 'bg-emerald-400/10' };
    }
    if (hasSelections) {
      return { label: 'Build In Progress', color: 'text-muted-foreground', icon: Loader2, bg: 'bg-muted/30' };
    }
    return { label: 'Select Components To Begin', color: 'text-muted-foreground/60', icon: null, bg: 'bg-muted/20' };
  }, [errors.length, warnings.length, isComplete, hasSelections]);

  function handleSave() {
    if (!buildName.trim()) return;
    dispatch({ type: 'SAVE_BUILD', payload: { name: buildName.trim() } });
    setBuildName('');
    setSaveDialogOpen(false);
  }

  return (
    <div className="flex flex-col rounded-xl border border-border/50 bg-card/60 backdrop-blur-2xl shadow-lg overflow-hidden">

      {/* ── Configuration Status Banner ── */}
      <div className={`px-4 py-3 ${buildStatus.bg}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {buildStatus.icon && (
              <buildStatus.icon className={`h-4 w-4 shrink-0 ${buildStatus.color}`} />
            )}
            <div className="flex flex-col min-w-0">
              <span className={`text-sm font-semibold ${buildStatus.color}`}>
                {buildStatus.label}
              </span>
              <span className="text-[11px] text-muted-foreground mt-0.5">
                {completedSteps.length} of {STEP_ORDER.length} components selected
              </span>
            </div>
          </div>
          
          <Button
            size="icon"
            className="h-8 w-8 shrink-0 rounded-md"
            disabled={!hasSelections}
            onClick={() => setSaveDialogOpen(true)}
            title="Save Configuration"
          >
            <Save className="h-4 w-4" />
          </Button>
        </div>
        <Progress value={progressPercent} className="mt-2.5 h-1.5" />
      </div>

      <Separator className="opacity-40" />

      {/* ── Component List ── */}
      <div className="flex flex-col px-4 py-2">
        {STEP_ORDER.map((category) => (
          <SummaryItem
            key={category}
            category={category}
            label={STEP_LABELS[category]}
            item={selections[category]}
            onClick={() => dispatch({ type: 'SET_STEP', payload: STEP_ORDER.indexOf(category) })}
          />
        ))}
      </div>

      <Separator className="opacity-40" />

      {/* ── Compatibility Status ── */}
      <div className="px-5 py-3">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/80 mb-3">
          Compatibility
        </h4>

        {!hasSelections ? (
          <p className="text-xs text-muted-foreground/50 italic">
            Select components to check compatibility
          </p>
        ) : errors.length > 0 ? (
          <div className="space-y-1.5">
            {errors.map((issue, i) => (
              <div key={`err-${i}`} className="flex items-start gap-2 rounded-lg bg-destructive/8 border border-destructive/20 px-2.5 py-2">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" />
                <p className="text-[11px] leading-relaxed text-destructive/90">{issue.message}</p>
              </div>
            ))}
            {warnings.map((issue, i) => (
              <div key={`warn-${i}`} className="flex items-start gap-2 rounded-lg bg-amber-400/5 border border-amber-400/15 px-2.5 py-2">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                <p className="text-[11px] leading-relaxed text-amber-400/80">{issue.message}</p>
              </div>
            ))}
          </div>
        ) : warnings.length > 0 ? (
          <div className="space-y-1.5">
            {warnings.map((issue, i) => (
              <div key={`warn-${i}`} className="flex items-start gap-2 rounded-lg bg-amber-400/5 border border-amber-400/15 px-2.5 py-2">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                <p className="text-[11px] leading-relaxed text-amber-400/80">{issue.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-500/8 border border-emerald-500/15 px-2.5 py-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            <p className="text-[11px] text-emerald-500/90 font-medium">All components are compatible</p>
          </div>
        )}
      </div>

      <Separator className="opacity-40" />

      {/* ── Power Draw & PSU Guidance ── */}
      <div className="px-5 py-3">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/80 mb-3">
          Power Analysis
        </h4>

        <div className="space-y-3">
          {/* Estimated power draw */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-amber-400/70" />
              <span className="text-xs text-muted-foreground">Est. Power Draw</span>
            </div>
            <span className="text-xs font-semibold tabular-nums text-foreground">
              {powerAnalysis.estimatedDraw}W
            </span>
          </div>

          {/* Recommended PSU */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Plug className="h-3.5 w-3.5 text-muted-foreground/50" />
              <span className="text-xs text-muted-foreground">Recommended PSU</span>
            </div>
            <span className="text-xs font-semibold tabular-nums text-foreground">
              {powerAnalysis.hasPowerComponents ? `${powerAnalysis.recommendedPsu}W` : '—'}
            </span>
          </div>

          {/* PSU Status message */}
          {powerAnalysis.psuStatus !== 'none' && (
            <div className={`flex items-start gap-2 rounded-md px-2.5 py-1.5 ${
              powerAnalysis.psuStatus === 'adequate'
                ? 'bg-emerald-500/8 border border-emerald-500/15'
                : powerAnalysis.psuStatus === 'tight'
                  ? 'bg-amber-400/5 border border-amber-400/15'
                  : 'bg-destructive/8 border border-destructive/20'
            }`}>
              {powerAnalysis.psuStatus === 'adequate' ? (
                <CheckCircle2 className="mt-0.5 h-3 w-3 text-emerald-500 shrink-0" />
              ) : powerAnalysis.psuStatus === 'tight' ? (
                <AlertTriangle className="mt-0.5 h-3 w-3 text-amber-400 shrink-0" />
              ) : (
                <AlertCircle className="mt-0.5 h-3 w-3 text-destructive shrink-0" />
              )}
              <span className={`text-[11px] leading-snug ${
                powerAnalysis.psuStatus === 'adequate'
                  ? 'text-emerald-500/90'
                  : powerAnalysis.psuStatus === 'tight'
                    ? 'text-amber-400/80'
                    : 'text-destructive/90'
              }`}>
                {powerAnalysis.psuMessage}
              </span>
            </div>
          )}
        </div>
      </div>

      <Separator className="opacity-40" />

      {/* ── Total Price ── */}
      <div className="p-4 pt-3 bg-muted/20 rounded-b-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-base font-semibold text-muted-foreground">Estimated Total</span>
          <PriceDisplay value={totalPrice} />
        </div>
      </div>

      {/* Save Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Save Build</DialogTitle>
            <DialogDescription>
              Give your configuration a name to access it later.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="My Awesome PC"
            value={buildName}
            onChange={(e) => setBuildName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
            }}
            autoFocus
          />
          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave} disabled={!buildName.trim()}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

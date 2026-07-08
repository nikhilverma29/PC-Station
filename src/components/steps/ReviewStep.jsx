import { useState, useMemo } from 'react';
import {
  Check, AlertTriangle, AlertCircle,
  RotateCcw, Save, Zap, Activity, Wallet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { useConfigurator } from '@/hooks/useConfigurator';
import { useCurrency } from '@/hooks/useCurrency';
import { STEP_ORDER, STEP_LABELS } from '@/data/products';
import { cn } from '@/lib/utils';
import { analyzeBuild, barColor, tierScoreLabel, useCaseLabel } from '@/lib/buildAnalysis';

function ScoreBar({ label, score }) {
  const { text, cls } = tierScoreLabel(score);
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className={cn('text-sm font-bold', cls)}>
          {score}<span className="text-xs font-normal opacity-50">/100</span>
        </span>
      </div>
      <div className="h-px w-full rounded-full bg-white/10">
        <div
          className={cn('h-px rounded-full transition-all duration-700', barColor(score))}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className={cn('text-xs mt-1.5', cls)}>{text}</p>
    </div>
  );
}

function UseCaseRow({ name, score }) {
  const { text, cls } = useCaseLabel(score);
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted-foreground shrink-0 w-32">{name}</span>
      <div className="flex-1 h-px rounded-full bg-white/10">
        <div
          className={cn('h-px rounded-full transition-all duration-700', barColor(score))}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={cn('text-xs font-semibold shrink-0 w-36 text-right', cls)}>{text}</span>
    </div>
  );
}

export default function ReviewStep() {
  const {
    selections, totalPrice, compatibilityIssues,
    completedSteps, dispatch, savedBuilds, editingBuildId,
  } = useConfigurator();
  const { formatPrice } = useCurrency();

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [incompleteWarningOpen, setIncompleteWarningOpen] = useState(false);
  const [buildName, setBuildName] = useState('');
  const [nameError, setNameError] = useState('');

  const errors   = compatibilityIssues.filter((i) => i.type === 'error');
  const warnings = compatibilityIssues.filter((i) => i.type === 'warning');

  const analysis = useMemo(() => analyzeBuild(selections, totalPrice), [selections, totalPrice]);

  const budgetItems = useMemo(() =>
    STEP_ORDER
      .filter((cat) => selections[cat])
      .map((cat) => ({
        label: STEP_LABELS[cat],
        price: selections[cat].price,
        pct:   Math.round((selections[cat].price / totalPrice) * 100),
      }))
      .sort((a, b) => b.price - a.price),
    [selections, totalPrice]
  );

  function handleSaveClick() {
    if (completedSteps.length < STEP_ORDER.length) {
      setIncompleteWarningOpen(true);
      return;
    }
    const editBuild = editingBuildId ? savedBuilds.find((b) => b.id === editingBuildId) : null;
    setBuildName(editBuild ? editBuild.name : '');
    setNameError('');
    setSaveDialogOpen(true);
  }

  function handleSave() {
    const name = buildName.trim();
    if (!name) { setNameError('Please enter a valid build name'); return; }

    const duplicate = savedBuilds.some(
      (b) => b.name.trim().toLowerCase() === name.toLowerCase() && b.id !== editingBuildId
    );
    if (duplicate) { setNameError('A build with this name already exists.'); return; }

    dispatch({ type: 'SAVE_BUILD', payload: { name } });
    setBuildName('');
    setNameError('');
    setSaveDialogOpen(false);
  }

  function handleReset() {
    dispatch({ type: 'RESET_BUILD' });
    setResetDialogOpen(false);
  }

  const hasData = completedSteps.length > 0;
  const card = 'rounded-2xl border border-white/10 bg-black p-6';

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Build Analysis</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {completedSteps.length} of {STEP_ORDER.length} components selected
        </p>
      </div>

      {!hasData && (
        <div className={cn(card, 'py-14 text-center')}>
          <p className="text-base text-muted-foreground">
            Select at least one component to see your build analysis.
          </p>
        </div>
      )}

      {hasData && (
        <>
          <div className={card}>
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Build Tier
                </span>
                <h3
                  className={cn('text-5xl font-normal mt-1 leading-none', analysis.tierTextColor)}
                  style={{ fontFamily: '"Zrnic", sans-serif' }}
                >
                  {analysis.tier.toUpperCase()}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-sm leading-relaxed">
                  {analysis.tierDesc}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <ScoreBar label="Gaming"       score={analysis.gaming}      />
              <ScoreBar label="Productivity" score={analysis.productivity} />
              <ScoreBar label="Value"        score={analysis.value}        />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={card}>
              <div className="flex items-center gap-2 mb-5">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-base font-semibold">Power Analysis</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="rounded-xl bg-white/5 px-4 py-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Est. Draw</p>
                  <p className="text-2xl font-bold">{analysis.estimatedDraw}W</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    CPU {analysis.cpuTdp}W · GPU {analysis.gpuTdp}W · misc 100W
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 px-4 py-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">PSU</p>
                  <p className="text-2xl font-bold">{analysis.psuW > 0 ? `${analysis.psuW}W` : '—'}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {analysis.psuW > 0 ? `${analysis.headroomPct}% headroom` : 'Not selected'}
                  </p>
                </div>
              </div>

              {analysis.psuW > 0 && (
                <>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-muted-foreground">PSU Load</span>
                    <span className={
                      analysis.loadPct > 90 ? 'text-red-400 font-semibold'
                      : analysis.loadPct > 75 ? 'text-amber-400 font-semibold'
                      : 'text-emerald-400 font-semibold'
                    }>
                      {analysis.loadPct}% —{' '}
                      {analysis.loadPct > 90 ? 'Dangerously high' : analysis.loadPct > 75 ? 'Acceptable' : 'Excellent headroom'}
                    </span>
                  </div>
                  <div className="h-px w-full rounded-full bg-white/10">
                    <div
                      className={cn(
                        'h-px rounded-full transition-all duration-700',
                        analysis.loadPct > 90 ? 'bg-red-500' : analysis.loadPct > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                      )}
                      style={{ width: `${Math.min(analysis.loadPct, 100)}%` }}
                    />
                  </div>
                </>
              )}
            </div>

            <div className={card}>
              <div className="flex items-center gap-2 mb-5">
                <Activity className="h-4 w-4 text-primary" />
                <span className="text-base font-semibold">Use Case Suitability</span>
              </div>
              <div className="space-y-5">
                {analysis.useCases.map((uc) => (
                  <UseCaseRow key={uc.name} name={uc.name} score={uc.score} />
                ))}
              </div>
            </div>
          </div>

          {budgetItems.length > 0 && (
            <div className={card}>
              <div className="flex items-center gap-2 mb-5">
                <Wallet className="h-4 w-4 text-primary" />
                <span className="text-base font-semibold">Budget Breakdown</span>
              </div>
              <div className="space-y-4">
                {budgetItems.map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground shrink-0 w-28">{item.label}</span>
                    <div className="flex-1 h-px rounded-full bg-white/10">
                      <div
                        className="h-px rounded-full bg-primary transition-all duration-700"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 w-8 text-right">{item.pct}%</span>
                    <span className="text-sm font-bold tabular-nums shrink-0 w-20 text-right">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {compatibilityIssues.length === 0 ? (
            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-5 py-3.5">
              <Check className="h-4 w-4 shrink-0 text-emerald-500" />
              <p className="text-sm text-emerald-500">All components are fully compatible — ready to build!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {errors.map((issue, i) => (
                <div key={`err-${i}`} className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-5 py-3">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  <p className="text-sm text-destructive">{issue.message}</p>
                </div>
              ))}
              {warnings.map((issue, i) => (
                <div key={`warn-${i}`} className="flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/5 px-5 py-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <p className="text-sm text-amber-400">{issue.message}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <div className="flex items-center justify-end gap-3 pt-1">
        <button
          onClick={() => setResetDialogOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/60 transition hover:bg-white/10 hover:text-white cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Start Over
        </button>
        <button
          onClick={handleSaveClick}
          className="flex items-center gap-2 rounded-lg bg-[#181002] text-primary px-5 py-2.5 text-sm font-bold border-t border-l border-r border-b-0 border-primary transition hover:bg-[#1f1402] cursor-pointer"
        >
          <Save className="h-4 w-4" />
          Save Build
        </button>
      </div>

      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Save Build</DialogTitle>
            <DialogDescription>Give your build a name so you can find it later.</DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Input
              placeholder="e.g., Dream Gaming Rig"
              value={buildName}
              maxLength={35}
              onChange={(e) => { setBuildName(e.target.value); if (nameError) setNameError(''); }}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); }}
              autoFocus
              className={nameError ? 'border-destructive' : ''}
            />
            {buildName.length >= 30 && (
              <span className={`absolute bottom-2 right-3 text-[10px] font-medium ${buildName.length === 35 ? 'text-destructive' : 'text-amber-500'}`}>
                {buildName.length}/35
              </span>
            )}
          </div>
          {nameError && <p className="text-sm text-destructive mt-1">{nameError}</p>}
          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={handleSave} disabled={!buildName.trim()}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Start Over?</DialogTitle>
            <DialogDescription>
              All current selections will be cleared and cannot be recovered.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setResetDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" size="sm" onClick={handleReset}>Yes, Start Over</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={incompleteWarningOpen} onOpenChange={setIncompleteWarningOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Incomplete Build</DialogTitle>
            <DialogDescription>
              You cannot save an incomplete build. Missing components:
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <ul className="space-y-1 text-sm text-amber-500">
              {STEP_ORDER.filter((s) => !selections[s]).map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  {STEP_LABELS[s]}
                </li>
              ))}
            </ul>
          </div>
          <DialogFooter>
            <Button size="sm" onClick={() => setIncompleteWarningOpen(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

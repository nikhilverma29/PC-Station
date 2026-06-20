import { useState } from 'react';
import {
  Check,
  AlertTriangle,
  AlertCircle,
  RotateCcw,
  Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useConfigurator } from '@/hooks/useConfigurator';
import { useCurrency } from '@/hooks/useCurrency';
import { STEP_ORDER, STEP_LABELS, getSpecLabels, CATEGORY_IMAGES } from '@/data/products';
import { cn } from '@/lib/utils';

export default function ReviewStep() {
  const {
    selections,
    totalPrice,
    compatibilityIssues,
    completedSteps,
    dispatch,
    savedBuilds,
    editingBuildId,
  } = useConfigurator();
  const { formatPrice } = useCurrency();

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [incompleteWarningOpen, setIncompleteWarningOpen] = useState(false);
  const [buildName, setBuildName] = useState('');
  const [nameError, setNameError] = useState('');

  const errors = compatibilityIssues.filter((i) => i.type === 'error');
  const warnings = compatibilityIssues.filter((i) => i.type === 'warning');

  function handleSaveClick() {
    if (completedSteps.length < STEP_ORDER.length) {
      setIncompleteWarningOpen(true);
      return;
    }
    const editBuild = editingBuildId ? savedBuilds.find(b => b.id === editingBuildId) : null;
    setBuildName(editBuild ? editBuild.name : '');
    setNameError('');
    setSaveDialogOpen(true);
  }

  function handleSave() {
    const trimmedName = buildName.trim();
    if (!trimmedName) {
      setNameError("Please enter a valid build name");
      return;
    }

    const isDuplicate = savedBuilds.some(b => 
      b.name.trim().toLowerCase() === trimmedName.toLowerCase() && b.id !== editingBuildId
    );
    
    if (isDuplicate) {
      setNameError("A build with this name already exists. Please choose a different name.");
      return;
    }

    dispatch({
      type: 'SAVE_BUILD',
      payload: { name: trimmedName },
    });
    setBuildName('');
    setNameError('');
    setSaveDialogOpen(false);
  }

  function handleReset() {
    dispatch({ type: 'RESET_BUILD' });
    setResetDialogOpen(false);
  }

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-xl font-semibold tracking-tight">Review Your Build</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {completedSteps.length} of {STEP_ORDER.length} components selected
        </p>
      </div>

      {/* Compatibility report */}
      {compatibilityIssues.length > 0 && (
        <div className="mb-5 space-y-2">
          {errors.map((issue, i) => (
            <div
              key={`err-${i}`}
              className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2.5"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              <p className="text-sm text-destructive">{issue.message}</p>
            </div>
          ))}
          {warnings.map((issue, i) => (
            <div
              key={`warn-${i}`}
              className="flex items-start gap-2 rounded-lg border border-amber-400/30 bg-amber-400/5 px-3 py-2.5"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <p className="text-sm text-amber-400">{issue.message}</p>
            </div>
          ))}
        </div>
      )}

      {compatibilityIssues.length === 0 && completedSteps.length > 0 && (
        <div className="mb-5 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-3 py-2.5">
          <Check className="h-4 w-4 text-emerald-500" />
          <p className="text-sm text-emerald-500">All components are compatible</p>
        </div>
      )}

      {/* Component list */}
      <div className="space-y-4">
        {STEP_ORDER.map((category) => {
          const item = selections[category];
          const specLabels = getSpecLabels(category);
          const categoryImage = item ? CATEGORY_IMAGES[category] : null;

          return (
            <Card key={category} className={cn('overflow-hidden transition-all', !item && 'opacity-50')}>
              <CardContent className="flex flex-col sm:flex-row items-center gap-4 p-4">
                {/* Image Section */}
                <div className="h-20 w-28 shrink-0 rounded-md bg-muted/20 overflow-hidden flex items-center justify-center">
                  {item && categoryImage ? (
                    <img 
                      src={categoryImage} 
                      alt="" 
                      className="h-full w-full object-cover opacity-80"
                    />
                  ) : (
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{STEP_LABELS[category]}</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {STEP_LABELS[category]}
                    </span>
                    {item && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-border/60">
                        {item.brand}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-base font-medium leading-snug">
                    {item ? item.name : '— Not selected'}
                  </p>
                  {item && (
                    <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                      {Object.entries(specLabels)
                        .slice(0, 4)
                        .map(([key, label]) => (
                          <span key={key} className="text-xs text-muted-foreground/90">
                            <span className="font-medium text-muted-foreground">{label}:</span> {String(item.specs[key])}
                          </span>
                        ))}
                    </div>
                  )}
                </div>

                <div className="sm:ml-4 sm:text-right mt-2 sm:mt-0 w-full sm:w-auto flex sm:block justify-between items-center">
                  {item ? (
                    <span className="text-xl font-bold tabular-nums">
                      {formatPrice(item.price)}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        dispatch({
                          type: 'SET_STEP',
                          payload: STEP_ORDER.indexOf(category),
                        })
                      }
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Select →
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Total */}
      <Separator className="my-4 opacity-40" />
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Estimated Total</span>
        <span className="text-2xl font-bold tabular-nums">
          {formatPrice(totalPrice)}
        </span>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setResetDialogOpen(true)}
          className="gap-2 text-muted-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Start Over
        </Button>
        <Button
          size="sm"
          onClick={handleSaveClick}
          disabled={completedSteps.length < STEP_ORDER.length}
          className="gap-2"
        >
          <Save className="h-3.5 w-3.5" />
          Save Build
        </Button>
      </div>

      {/* Save Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Save Build</DialogTitle>
            <DialogDescription>
              Give your build a name so you can find it later.
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Input
              placeholder="e.g., Dream Gaming Rig"
              value={buildName}
              maxLength={35}
              onChange={(e) => {
                setBuildName(e.target.value);
                if (nameError) setNameError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
              }}
              autoFocus
              className={nameError ? 'border-destructive' : ''}
            />
            {buildName.length >= 30 && (
              <span className={`absolute bottom-2 right-3 text-[10px] font-medium ${buildName.length === 35 ? 'text-destructive' : 'text-amber-500'}`}>
                {buildName.length}/35
              </span>
            )}
          </div>
          {nameError && (
            <p className="text-sm text-destructive mt-1">{nameError}</p>
          )}
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

      {/* Reset Dialog */}
      <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Start Over?</DialogTitle>
            <DialogDescription>
              Are you sure you want to start over? All your current component selections will be cleared and cannot be recovered.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setResetDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm" onClick={handleReset}>
              Yes, Start Over
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Incomplete Warning Dialog */}
      <Dialog open={incompleteWarningOpen} onOpenChange={setIncompleteWarningOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Incomplete Build</DialogTitle>
            <DialogDescription>
              You cannot save an incomplete build. The following components are still missing:
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <ul className="space-y-1 text-sm text-amber-500">
              {STEP_ORDER.filter(s => !selections[s]).map(s => <li key={s} className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" />{STEP_LABELS[s]}</li>)}
            </ul>
          </div>
          <DialogFooter>
            <Button size="sm" onClick={() => setIncompleteWarningOpen(false)}>
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

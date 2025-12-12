import { useState } from 'react';
import { OnboardingState, PILLAR_OPTIONS } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Layers, Check, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepPillarsProps {
  state: OnboardingState;
  updateState: (updates: Partial<OnboardingState>) => void;
}

export function StepPillars({ state, updateState }: StepPillarsProps) {
  const [newPillar, setNewPillar] = useState('');

  const togglePillar = (pillar: string) => {
    const newPillars = state.contentPillars.includes(pillar)
      ? state.contentPillars.filter(p => p !== pillar)
      : state.contentPillars.length < 5
      ? [...state.contentPillars, pillar]
      : state.contentPillars;
    
    updateState({ contentPillars: newPillars });
  };

  const addCustomPillar = () => {
    if (newPillar.trim() && !state.customPillars.includes(newPillar.trim())) {
      updateState({
        customPillars: [...state.customPillars, newPillar.trim()],
      });
      setNewPillar('');
    }
  };

  const removeCustomPillar = (pillar: string) => {
    updateState({
      customPillars: state.customPillars.filter(p => p !== pillar),
    });
  };

  const totalSelected = state.contentPillars.length + state.customPillars.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary">
          <Layers className="h-7 w-7 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold">Choose your content pillars</h2>
          <p className="text-muted-foreground">Select 3-5 themes for your LinkedIn content</p>
        </div>
      </div>

      {/* Preset Pillars */}
      <div className="grid grid-cols-2 gap-2">
        {PILLAR_OPTIONS.map((pillar) => (
          <button
            key={pillar}
            onClick={() => togglePillar(pillar)}
            disabled={!state.contentPillars.includes(pillar) && totalSelected >= 5}
            className={cn(
              "flex items-center justify-between px-4 py-3 rounded-lg border text-left transition-all",
              state.contentPillars.includes(pillar)
                ? "border-primary bg-primary/5 text-foreground"
                : totalSelected >= 5
                ? "border-border text-muted-foreground opacity-50 cursor-not-allowed"
                : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="text-sm font-medium">{pillar}</span>
            {state.contentPillars.includes(pillar) && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Custom Pillars */}
      <div className="space-y-3">
        <p className="text-sm font-medium">Add custom pillars</p>
        <div className="flex gap-2">
          <Input
            placeholder="e.g., AI & Automation"
            value={newPillar}
            onChange={(e) => setNewPillar(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCustomPillar()}
            disabled={totalSelected >= 5}
          />
          <Button
            type="button"
            variant="outline"
            onClick={addCustomPillar}
            disabled={!newPillar.trim() || totalSelected >= 5}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {state.customPillars.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {state.customPillars.map((pillar) => (
              <div
                key={pillar}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm"
              >
                <span>{pillar}</span>
                <button
                  onClick={() => removeCustomPillar(pillar)}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Counter */}
      <div className={cn(
        "text-sm text-center py-2 rounded-lg",
        totalSelected >= 3 && totalSelected <= 5
          ? "bg-success/10 text-success"
          : "bg-muted text-muted-foreground"
      )}>
        {totalSelected} of 3-5 pillars selected
        {totalSelected < 3 && " (select at least 3)"}
      </div>
    </div>
  );
}

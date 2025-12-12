import { OnboardingState, FREQUENCY_OPTIONS } from '@/types';
import { Calendar, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepFrequencyProps {
  state: OnboardingState;
  updateState: (updates: Partial<OnboardingState>) => void;
}

export function StepFrequency({ state, updateState }: StepFrequencyProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary">
          <Calendar className="h-7 w-7 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold">How often do you want to post?</h2>
          <p className="text-muted-foreground">Choose a posting frequency that works for you</p>
        </div>
      </div>

      <div className="grid gap-3">
        {FREQUENCY_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => updateState({ postingFrequency: option.value })}
            className={cn(
              "flex items-center justify-between p-5 rounded-xl border text-left transition-all",
              state.postingFrequency === option.value
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-lg font-display text-lg font-bold",
                state.postingFrequency === option.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}>
                {option.value}
              </div>
              <div>
                <p className="font-semibold">{option.label}</p>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
            </div>
            {state.postingFrequency === option.value && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <Check className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="bg-accent/50 rounded-lg p-4 mt-4">
        <p className="text-sm text-accent-foreground">
          <strong>Tip:</strong> Starting with 8-12 posts per month is ideal for most creators. 
          You can always adjust this later.
        </p>
      </div>
    </div>
  );
}

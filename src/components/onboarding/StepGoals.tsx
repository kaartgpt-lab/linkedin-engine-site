import { OnboardingState, GOAL_OPTIONS } from '@/types';
import { Target, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepGoalsProps {
  state: OnboardingState;
  updateState: (updates: Partial<OnboardingState>) => void;
}

export function StepGoals({ state, updateState }: StepGoalsProps) {
  const toggleGoal = (goal: string) => {
    const newGoals = state.goals.includes(goal)
      ? state.goals.filter(g => g !== goal)
      : [...state.goals, goal];
    
    updateState({ goals: newGoals });
  };

  const goalIcons: Record<string, string> = {
    'Build audience': '📈',
    'Get clients/inbound': '💼',
    'Attract talent': '👥',
    'Build investor visibility': '🎯',
    'Authority in industry': '🏆',
    'Document journey': '📝',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary">
          <Target className="h-7 w-7 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold">What are your LinkedIn goals?</h2>
          <p className="text-muted-foreground">Select all that apply to you</p>
        </div>
      </div>

      <div className="grid gap-3">
        {GOAL_OPTIONS.map((goal) => (
          <button
            key={goal}
            onClick={() => toggleGoal(goal)}
            className={cn(
              "flex items-center gap-4 p-4 rounded-xl border text-left transition-all",
              state.goals.includes(goal)
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            )}
          >
            <span className="text-2xl">{goalIcons[goal]}</span>
            <span className="flex-1 font-medium">{goal}</span>
            {state.goals.includes(goal) && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <Check className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
          </button>
        ))}
      </div>

      {state.goals.length > 0 && (
        <p className="text-sm text-muted-foreground text-center">
          {state.goals.length} goal{state.goals.length > 1 ? 's' : ''} selected
        </p>
      )}
    </div>
  );
}

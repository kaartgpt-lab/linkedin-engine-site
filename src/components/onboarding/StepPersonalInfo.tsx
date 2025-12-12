import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { OnboardingState } from '@/types';
import { User } from 'lucide-react';

interface StepPersonalInfoProps {
  state: OnboardingState;
  updateState: (updates: Partial<OnboardingState>) => void;
}

export function StepPersonalInfo({ state, updateState }: StepPersonalInfoProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary">
          <User className="h-8 w-8 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold">Let's get to know you</h2>
          <p className="text-muted-foreground">We'll use this to personalize your content</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-base">What's your full name?</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="John Doe"
            value={state.name}
            onChange={(e) => updateState({ name: e.target.value })}
            className="h-12 text-lg"
          />
          <p className="text-sm text-muted-foreground">
            This is how you'll be referenced in your content strategy
          </p>
        </div>
      </div>
    </div>
  );
}

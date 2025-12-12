import { OnboardingState } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Mic, Plus, X } from 'lucide-react';

interface StepToneProps {
  state: OnboardingState;
  updateState: (updates: Partial<OnboardingState>) => void;
}

const toneSliders = [
  { key: 'casualToFormal', left: 'Casual', right: 'Formal' },
  { key: 'rawToPolished', left: 'Raw', right: 'Polished' },
  { key: 'punchyToStorytelling', left: 'Punchy', right: 'Storytelling' },
  { key: 'boldToSafe', left: 'Bold', right: 'Safe' },
] as const;

export function StepTone({ state, updateState }: StepToneProps) {
  const updateTone = (key: keyof typeof state.toneProfile, value: number[]) => {
    updateState({
      toneProfile: {
        ...state.toneProfile,
        [key]: value[0],
      },
    });
  };

  const addCreator = () => {
    updateState({
      admiredCreators: [...state.admiredCreators, ''],
    });
  };

  const updateCreator = (index: number, value: string) => {
    const newCreators = [...state.admiredCreators];
    newCreators[index] = value;
    updateState({ admiredCreators: newCreators });
  };

  const removeCreator = (index: number) => {
    if (state.admiredCreators.length > 1) {
      updateState({
        admiredCreators: state.admiredCreators.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary">
          <Mic className="h-7 w-7 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold">Define your tone of voice</h2>
          <p className="text-muted-foreground">Adjust the sliders to match your style</p>
        </div>
      </div>

      {/* Tone Sliders */}
      <div className="space-y-6">
        {toneSliders.map(({ key, left, right }) => (
          <div key={key} className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{left}</span>
              <span className="text-sm font-medium">{right}</span>
            </div>
            <Slider
              value={[state.toneProfile[key]]}
              onValueChange={(value) => updateTone(key, value)}
              max={10}
              step={1}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span className="font-medium text-primary">{state.toneProfile[key]}</span>
              <span>10</span>
            </div>
          </div>
        ))}
      </div>

      {/* Admired Creators */}
      <div className="space-y-4 pt-4 border-t border-border">
        <Label className="text-base">Creators you admire on LinkedIn (2-5)</Label>
        <p className="text-sm text-muted-foreground">
          We'll analyze their style to help match your voice
        </p>
        
        <div className="space-y-2">
          {state.admiredCreators.map((creator, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="@username or profile URL"
                value={creator}
                onChange={(e) => updateCreator(index, e.target.value)}
              />
              {state.admiredCreators.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCreator(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        
        {state.admiredCreators.length < 5 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addCreator}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add another
          </Button>
        )}
      </div>
    </div>
  );
}

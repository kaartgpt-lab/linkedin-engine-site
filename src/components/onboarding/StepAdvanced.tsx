import { OnboardingState } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Settings, ChevronDown, Plus, X } from 'lucide-react';
import { useState } from 'react';

interface StepAdvancedProps {
  state: OnboardingState;
  updateState: (updates: Partial<OnboardingState>) => void;
}

export function StepAdvanced({ state, updateState }: StepAdvancedProps) {
  const [beliefsOpen, setBeliefsOpen] = useState(true);
  const [postsOpen, setPostsOpen] = useState(false);

  const updateBelief = (index: number, value: string) => {
    const newBeliefs = [...state.beliefs];
    newBeliefs[index] = value;
    updateState({ beliefs: newBeliefs });
  };

  const addPastPost = () => {
    updateState({ pastPosts: [...state.pastPosts, ''] });
  };

  const updatePastPost = (index: number, value: string) => {
    const newPosts = [...state.pastPosts];
    newPosts[index] = value;
    updateState({ pastPosts: newPosts });
  };

  const removePastPost = (index: number) => {
    if (state.pastPosts.length > 1) {
      updateState({
        pastPosts: state.pastPosts.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary">
          <Settings className="h-7 w-7 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold">Advanced settings</h2>
          <p className="text-muted-foreground">Optional - Fine-tune your content voice</p>
        </div>
      </div>

      {/* Beliefs Section */}
      <Collapsible open={beliefsOpen} onOpenChange={setBeliefsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg bg-muted/50 hover:bg-muted">
          <div className="text-left">
            <p className="font-medium">Your beliefs & opinions</p>
            <p className="text-sm text-muted-foreground">What do you strongly believe about your industry?</p>
          </div>
          <ChevronDown className={`h-5 w-5 transition-transform ${beliefsOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-4">
          {state.beliefs.map((belief, index) => (
            <div key={index} className="space-y-1">
              <Label className="text-sm">Belief {index + 1}</Label>
              <Input
                placeholder="e.g., Building in public creates more opportunities than hiding"
                value={belief}
                onChange={(e) => updateBelief(index, e.target.value)}
              />
            </div>
          ))}
          
          <div className="space-y-2">
            <Label className="text-sm">What do you never want to sound like?</Label>
            <Input
              placeholder="e.g., corporate, motivational, guru-ish"
              value={state.dontSoundLike}
              onChange={(e) => updateState({ dontSoundLike: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm">Topics that are off-limits</Label>
            <Input
              placeholder="e.g., politics, religion"
              value={state.offLimitTopics}
              onChange={(e) => updateState({ offLimitTopics: e.target.value })}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Past Posts Section */}
      <Collapsible open={postsOpen} onOpenChange={setPostsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg bg-muted/50 hover:bg-muted">
          <div className="text-left">
            <p className="font-medium">Your past LinkedIn posts</p>
            <p className="text-sm text-muted-foreground">Paste 3-5 posts to help match your voice</p>
          </div>
          <ChevronDown className={`h-5 w-5 transition-transform ${postsOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 space-y-3">
          {state.pastPosts.map((post, index) => (
            <div key={index} className="flex gap-2">
              <Textarea
                placeholder="Paste your LinkedIn post here..."
                value={post}
                onChange={(e) => updatePastPost(index, e.target.value)}
                rows={3}
                className="flex-1"
              />
              {state.pastPosts.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removePastPost(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          
          {state.pastPosts.length < 5 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addPastPost}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Add another post
            </Button>
          )}
        </CollapsibleContent>
      </Collapsible>

      {/* Additional Info */}
      <div className="space-y-2">
        <Label>Anything else we should know?</Label>
        <Textarea
          placeholder="The more detail you provide, the better your content will be..."
          value={state.additionalInfo}
          onChange={(e) => updateState({ additionalInfo: e.target.value })}
          rows={4}
        />
      </div>
    </div>
  );
}

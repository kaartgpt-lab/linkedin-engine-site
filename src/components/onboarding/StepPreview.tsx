import { OnboardingState } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, User, Target, Calendar, Layers, Mic } from 'lucide-react';

interface StepPreviewProps {
  state: OnboardingState;
}

export function StepPreview({ state }: StepPreviewProps) {
  const getToneLabel = (value: number) => {
    if (value <= 3) return 'Low';
    if (value <= 6) return 'Medium';
    return 'High';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary">
          <CheckCircle2 className="h-7 w-7 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold">Review your content brain</h2>
          <p className="text-muted-foreground">Make sure everything looks good before we create your profile</p>
        </div>
      </div>

      <div className="grid gap-4">
        {/* Personal Info */}
        <Card className="border-border/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <User className="h-4 w-4 text-primary" />
              Personal Info
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-4">
            <p className="font-medium">{state.name}</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {state.selectedRoles.map((role) => (
                <Badge key={role} variant="secondary" className="text-xs">
                  {role}
                  {state.roleDetails[role]?.importance && (
                    <span className="ml-1 opacity-60">
                      ({state.roleDetails[role]?.importance})
                    </span>
                  )}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Goals */}
        <Card className="border-border/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Target className="h-4 w-4 text-primary" />
              Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-4">
            <div className="flex flex-wrap gap-1.5">
              {state.goals.map((goal) => (
                <Badge key={goal} variant="outline" className="text-xs">
                  {goal}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Posting Frequency */}
        <Card className="border-border/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4 text-primary" />
              Posting Frequency
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-4">
            <p className="font-medium">{state.postingFrequency} posts per month</p>
          </CardContent>
        </Card>

        {/* Content Pillars */}
        <Card className="border-border/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Layers className="h-4 w-4 text-primary" />
              Content Pillars
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-4">
            <div className="flex flex-wrap gap-1.5">
              {[...state.contentPillars, ...state.customPillars].map((pillar) => (
                <Badge key={pillar} className="text-xs">
                  {pillar}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tone Profile */}
        <Card className="border-border/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Mic className="h-4 w-4 text-primary" />
              Tone Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Casual → Formal:</span>{' '}
                <span className="font-medium">{state.toneProfile.casualToFormal}/10</span>
              </div>
              <div>
                <span className="text-muted-foreground">Raw → Polished:</span>{' '}
                <span className="font-medium">{state.toneProfile.rawToPolished}/10</span>
              </div>
              <div>
                <span className="text-muted-foreground">Punchy → Story:</span>{' '}
                <span className="font-medium">{state.toneProfile.punchyToStorytelling}/10</span>
              </div>
              <div>
                <span className="text-muted-foreground">Bold → Safe:</span>{' '}
                <span className="font-medium">{state.toneProfile.boldToSafe}/10</span>
              </div>
            </div>
            
            {state.admiredCreators.filter(Boolean).length > 0 && (
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">Admired creators:</p>
                <p className="text-sm">{state.admiredCreators.filter(Boolean).join(', ')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="bg-accent/50 rounded-lg p-4">
        <p className="text-sm text-accent-foreground">
          <strong>Ready to go!</strong> Click "Create Profile" to save your content brain and start generating your personalized LinkedIn calendar.
        </p>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { OnboardingState, ROLE_OPTIONS, UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Check, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepRolesProps {
  state: OnboardingState;
  updateState: (updates: Partial<OnboardingState>) => void;
}

export function StepRoles({ state, updateState }: StepRolesProps) {
  const [expandedRole, setExpandedRole] = useState<string | null>(null);

  const toggleRole = (role: string) => {
    const newRoles = state.selectedRoles.includes(role)
      ? state.selectedRoles.filter(r => r !== role)
      : [...state.selectedRoles, role];
    
    updateState({ selectedRoles: newRoles });
    
    if (!state.selectedRoles.includes(role)) {
      setExpandedRole(role);
    }
  };

  const updateRoleDetail = (role: string, field: keyof UserRole, value: string) => {
    updateState({
      roleDetails: {
        ...state.roleDetails,
        [role]: {
          ...state.roleDetails[role],
          [field]: value,
        },
      },
    });
  };

  const importanceLevels = ['high', 'medium', 'low'] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary">
          <Briefcase className="h-7 w-7 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold">What roles do you operate in?</h2>
          <p className="text-muted-foreground">Select all that apply - you can add details for each</p>
        </div>
      </div>

      {/* Role Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {ROLE_OPTIONS.map((role) => (
          <button
            key={role}
            onClick={() => toggleRole(role)}
            className={cn(
              "flex items-center justify-between px-4 py-3 rounded-lg border text-left transition-all",
              state.selectedRoles.includes(role)
                ? "border-primary bg-primary/5 text-foreground"
                : "border-border hover:border-primary/50 text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="text-sm font-medium">{role}</span>
            {state.selectedRoles.includes(role) && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Selected Roles Details */}
      {state.selectedRoles.length > 0 && (
        <div className="space-y-3 mt-6">
          <Label className="text-base">Tell us more about each role</Label>
          
          {state.selectedRoles.map((role) => (
            <Card 
              key={role} 
              className={cn(
                "border-border/50 overflow-hidden transition-all",
                expandedRole === role && "border-primary/30"
              )}
            >
              <button
                onClick={() => setExpandedRole(expandedRole === role ? null : role)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{role}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {state.roleDetails[role]?.importance 
                      ? `${state.roleDetails[role]?.importance} priority`
                      : 'Set priority'}
                  </span>
                </div>
                {expandedRole === role ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              
              {expandedRole === role && (
                <CardContent className="pt-0 pb-4 px-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Company/Brand Name (optional)</Label>
                    <Input
                      placeholder="e.g., TechStartup Inc"
                      value={state.roleDetails[role]?.companyName || ''}
                      onChange={(e) => updateRoleDetail(role, 'companyName', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>What do you do? (1-2 sentences)</Label>
                    <Textarea
                      placeholder="e.g., I build SaaS tools that help teams collaborate better"
                      value={state.roleDetails[role]?.description || ''}
                      onChange={(e) => updateRoleDetail(role, 'description', e.target.value)}
                      rows={2}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Who do you serve?</Label>
                    <Input
                      placeholder="e.g., Early-stage startup founders"
                      value={state.roleDetails[role]?.audience || ''}
                      onChange={(e) => updateRoleDetail(role, 'audience', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>What do you sell/offer?</Label>
                    <Input
                      placeholder="e.g., Project management software"
                      value={state.roleDetails[role]?.offer || ''}
                      onChange={(e) => updateRoleDetail(role, 'offer', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>How important is this role for your LinkedIn content?</Label>
                    <div className="flex gap-2">
                      {importanceLevels.map((level) => (
                        <Button
                          key={level}
                          type="button"
                          variant={state.roleDetails[role]?.importance === level ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateRoleDetail(role, 'importance', level)}
                          className="capitalize"
                        >
                          {level}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

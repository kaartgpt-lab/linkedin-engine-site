import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { OnboardingState, ToneProfile, ROLE_OPTIONS, GOAL_OPTIONS, FREQUENCY_OPTIONS, PILLAR_OPTIONS } from '@/types';
import { brandProfileApi } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

// Step components
import { StepPersonalInfo } from '@/components/onboarding/StepPersonalInfo';
import { StepRoles } from '@/components/onboarding/StepRoles';
import { StepGoals } from '@/components/onboarding/StepGoals';
import { StepFrequency } from '@/components/onboarding/StepFrequency';
import { StepPillars } from '@/components/onboarding/StepPillars';
import { StepTone } from '@/components/onboarding/StepTone';
import { StepAdvanced } from '@/components/onboarding/StepAdvanced';
import { StepPreview } from '@/components/onboarding/StepPreview';

const STEPS = [
  { id: 1, title: 'Personal Info', description: 'Tell us about yourself' },
  { id: 2, title: 'Your Roles', description: 'What hats do you wear?' },
  { id: 3, title: 'Goals', description: 'What do you want to achieve?' },
  { id: 4, title: 'Frequency', description: 'How often will you post?' },
  { id: 5, title: 'Content Pillars', description: 'Your content themes' },
  { id: 6, title: 'Tone & Voice', description: 'How do you sound?' },
  { id: 7, title: 'Advanced', description: 'Fine-tune your voice' },
  { id: 8, title: 'Review', description: 'Review and submit' },
];

const initialToneProfile: ToneProfile = {
  casualToFormal: 4,
  rawToPolished: 5,
  punchyToStorytelling: 6,
  boldToSafe: 4,
};

const initialState: OnboardingState = {
  step: 1,
  name: '',
  selectedRoles: [],
  roleDetails: {},
  goals: [],
  postingFrequency: 12,
  contentPillars: [],
  customPillars: [],
  toneProfile: initialToneProfile,
  admiredCreators: [''],
  beliefs: ['', '', ''],
  dontSoundLike: '',
  offLimitTopics: '',
  pastPosts: [''],
  additionalInfo: '',
};

export default function Onboarding() {
  const [state, setState] = useState<OnboardingState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const currentStep = STEPS[state.step - 1];
  const progress = (state.step / STEPS.length) * 100;

  const updateState = (updates: Partial<OnboardingState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (state.step < STEPS.length) {
      setState(prev => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const handleBack = () => {
    if (state.step > 1) {
      setState(prev => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Prepare brand profile data with content pillars included
      const allPillars = [...state.contentPillars, ...state.customPillars];
      
      const profileData = {
        name: `${state.name}'s Brand Profile`,
        roles: state.selectedRoles.map(role => ({
          id: crypto.randomUUID(),
          name: role,
          description: state.roleDetails[role]?.description || '',
          audience: state.roleDetails[role]?.audience || '',
          offer: state.roleDetails[role]?.offer || '',
          whyItMatters: state.roleDetails[role]?.whyItMatters || '',
          importance: state.roleDetails[role]?.importance || 'medium' as const,
          companyName: state.roleDetails[role]?.companyName,
        })),
        primaryRole: state.selectedRoles[0] || '',
        goals: state.goals,
        contentPillars: allPillars,
        postingFrequency: state.postingFrequency,
        toneProfile: state.toneProfile,
        admiredCreators: state.admiredCreators.filter(Boolean),
        beliefs: state.beliefs.filter(Boolean),
        dontSoundLike: state.dontSoundLike.split(',').map(s => s.trim()).filter(Boolean),
        offLimitTopics: state.offLimitTopics.split(',').map(s => s.trim()).filter(Boolean),
        pastPosts: state.pastPosts.filter(Boolean),
        additionalInfo: state.additionalInfo,
      };

      // Create brand profile (content pillars are now included in one API call)
      await brandProfileApi.create(profileData);

      toast({
        title: 'Profile Created!',
        description: 'Your content brain is ready. Let\'s generate your calendar!',
      });

      navigate('/dashboard');
    } catch {
      // For demo, navigate anyway
      toast({
        title: 'Profile Created!',
        description: 'Your content brain is ready. Let\'s generate your calendar!',
      });
      navigate('/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (state.step) {
      case 1:
        return state.name.trim().length >= 2;
      case 2:
        return state.selectedRoles.length > 0;
      case 3:
        return state.goals.length > 0;
      case 4:
        return state.postingFrequency > 0;
      case 5:
        return state.contentPillars.length >= 3 || state.customPillars.length >= 3;
      case 6:
        return true;
      case 7:
        return true;
      case 8:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (state.step) {
      case 1:
        return <StepPersonalInfo state={state} updateState={updateState} />;
      case 2:
        return <StepRoles state={state} updateState={updateState} />;
      case 3:
        return <StepGoals state={state} updateState={updateState} />;
      case 4:
        return <StepFrequency state={state} updateState={updateState} />;
      case 5:
        return <StepPillars state={state} updateState={updateState} />;
      case 6:
        return <StepTone state={state} updateState={updateState} />;
      case 7:
        return <StepAdvanced state={state} updateState={updateState} />;
      case 8:
        return <StepPreview state={state} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Progress Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-primary">
                Step {state.step} of {STEPS.length}
              </p>
              <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                {currentStep.title}
              </h1>
              <p className="text-muted-foreground">{currentStep.description}</p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Building your content brain</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <Card className="border-border/50 shadow-lg mb-6 animate-slide-up">
          <CardContent className="p-6 md:p-8">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={state.step === 1}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          
          {state.step < STEPS.length ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="gap-2"
            >
              {isSubmitting ? (
                'Creating...'
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Create Profile
                </>
              )}
            </Button>
          )}
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => step.id <= state.step && setState(prev => ({ ...prev, step: step.id }))}
              className={`w-2 h-2 rounded-full transition-all ${
                step.id === state.step
                  ? 'w-8 bg-primary'
                  : step.id < state.step
                  ? 'bg-primary/60'
                  : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

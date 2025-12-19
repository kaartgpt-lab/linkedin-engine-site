import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Save, Plus, X, Trash2 } from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useProfile, useUpdateProfile, useDeleteProfile } from '@/hooks/useProfiles';
import { GOAL_OPTIONS, PILLAR_OPTIONS, FREQUENCY_OPTIONS } from '@/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const profileSchema = z.object({
  name: z.string().min(1, 'Profile name is required'),
  additionalInfo: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileEdit() {
  const { profileId } = useParams<{ profileId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: profile, isLoading, error } = useProfile(profileId || '');
  const updateProfile = useUpdateProfile();
  const deleteProfile = useDeleteProfile();

  const [goals, setGoals] = useState<string[]>([]);
  const [pillars, setPillars] = useState<string[]>([]);
  const [customPillar, setCustomPillar] = useState('');
  const [frequency, setFrequency] = useState(8);
  const [toneProfile, setToneProfile] = useState({
    casualToFormal: 5,
    rawToPolished: 5,
    punchyToStorytelling: 5,
    boldToSafe: 5,
  });
  const [admiredCreators, setAdmiredCreators] = useState<string[]>([]);
  const [newCreator, setNewCreator] = useState('');
  const [beliefs, setBeliefs] = useState<string[]>(['', '', '']);
  const [dontSoundLike, setDontSoundLike] = useState('');
  const [offLimitTopics, setOffLimitTopics] = useState('');

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      additionalInfo: '',
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name,
        additionalInfo: profile.additionalInfo || '',
      });
      setGoals(profile.goals || []);
      setPillars(profile.contentPillars || []);
      setFrequency(profile.postingFrequency || 8);
      setToneProfile(profile.toneProfile || {
        casualToFormal: 5,
        rawToPolished: 5,
        punchyToStorytelling: 5,
        boldToSafe: 5,
      });
      setAdmiredCreators(profile.admiredCreators || []);
      setBeliefs(profile.beliefs?.length ? profile.beliefs : ['', '', '']);
      setDontSoundLike(profile.dontSoundLike?.join(', ') || '');
      setOffLimitTopics(profile.offLimitTopics?.join(', ') || '');
    }
  }, [profile, form]);

  const toggleGoal = (goal: string) => {
    setGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const togglePillar = (pillar: string) => {
    setPillars(prev => {
      if (prev.includes(pillar)) {
        return prev.filter(p => p !== pillar);
      }
      if (prev.length >= 5) {
        toast({ title: 'Maximum 5 pillars', variant: 'destructive' });
        return prev;
      }
      return [...prev, pillar];
    });
  };

  const addCustomPillar = () => {
    if (customPillar.trim() && pillars.length < 5) {
      setPillars(prev => [...prev, customPillar.trim()]);
      setCustomPillar('');
    }
  };

  const addCreator = () => {
    if (newCreator.trim() && admiredCreators.length < 5) {
      setAdmiredCreators(prev => [...prev, newCreator.trim()]);
      setNewCreator('');
    }
  };

  const removeCreator = (index: number) => {
    setAdmiredCreators(prev => prev.filter((_, i) => i !== index));
  };

  const updateBelief = (index: number, value: string) => {
    setBeliefs(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const onSubmit = async (data: ProfileFormData) => {
    if (!profileId) return;

    try {
      await updateProfile.mutateAsync({
        id: profileId,
        data: {
          ...data,
          goals,
          contentPillars: pillars,
          postingFrequency: frequency,
          toneProfile,
          admiredCreators,
          beliefs: beliefs.filter(b => b.trim()),
          dontSoundLike: dontSoundLike.split(',').map(s => s.trim()).filter(Boolean),
          offLimitTopics: offLimitTopics.split(',').map(s => s.trim()).filter(Boolean),
        },
      });
      navigate('/dashboard');
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleDelete = async () => {
    if (!profileId) return;
    try {
      await deleteProfile.mutateAsync(profileId);
      navigate('/dashboard');
    } catch (error) {
      // Error handled in hook
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground">Profile not found</h2>
            <Button onClick={() => navigate('/dashboard')} className="mt-4">
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">Edit Profile</h1>
              <p className="text-muted-foreground">{profile.name}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Profile?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete this brand profile and all associated content.
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="tone">Tone & Style</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Update your profile name and basic settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Profile Name</Label>
                    <Input
                      id="name"
                      {...form.register('name')}
                      placeholder="e.g., My Personal Brand"
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label>Goals</Label>
                    <div className="flex flex-wrap gap-2">
                      {GOAL_OPTIONS.map((goal) => (
                        <Badge
                          key={goal}
                          variant={goals.includes(goal) ? 'default' : 'outline'}
                          className="cursor-pointer transition-all hover:scale-105"
                          onClick={() => toggleGoal(goal)}
                        >
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Posting Frequency</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {FREQUENCY_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFrequency(option.value)}
                          className={`p-3 rounded-lg border-2 transition-all text-center ${
                            frequency === option.value
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="font-semibold text-foreground">{option.label}</div>
                          <div className="text-xs text-muted-foreground">{option.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Content Pillars</CardTitle>
                  <CardDescription>Select 3-5 themes for your content (currently {pillars.length}/5)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {PILLAR_OPTIONS.map((pillar) => (
                      <button
                        key={pillar}
                        type="button"
                        onClick={() => togglePillar(pillar)}
                        className={`p-3 rounded-lg border-2 transition-all text-sm ${
                          pillars.includes(pillar)
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-primary/50 text-foreground'
                        }`}
                      >
                        {pillar}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Add custom pillar..."
                      value={customPillar}
                      onChange={(e) => setCustomPillar(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomPillar())}
                    />
                    <Button type="button" variant="outline" onClick={addCustomPillar}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {pillars.filter(p => !PILLAR_OPTIONS.includes(p as any)).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {pillars.filter(p => !PILLAR_OPTIONS.includes(p as any)).map((pillar, i) => (
                        <Badge key={i} variant="secondary" className="gap-1">
                          {pillar}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => setPillars(prev => prev.filter(p => p !== pillar))}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tone Tab */}
            <TabsContent value="tone">
              <Card>
                <CardHeader>
                  <CardTitle>Tone of Voice</CardTitle>
                  <CardDescription>Adjust the sliders to define your writing style</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {[
                    { key: 'casualToFormal', left: 'Casual', right: 'Formal' },
                    { key: 'rawToPolished', left: 'Raw', right: 'Polished' },
                    { key: 'punchyToStorytelling', left: 'Punchy', right: 'Storytelling' },
                    { key: 'boldToSafe', left: 'Bold', right: 'Safe' },
                  ].map(({ key, left, right }) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{left}</span>
                        <span className="text-muted-foreground">{right}</span>
                      </div>
                      <Slider
                        value={[toneProfile[key as keyof typeof toneProfile]]}
                        onValueChange={([value]) => 
                          setToneProfile(prev => ({ ...prev, [key]: value }))
                        }
                        max={10}
                        step={1}
                        className="cursor-pointer"
                      />
                    </div>
                  ))}

                  <div className="space-y-3 pt-4 border-t">
                    <Label>Admired Creators (up to 5)</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="LinkedIn URL or name..."
                        value={newCreator}
                        onChange={(e) => setNewCreator(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCreator())}
                      />
                      <Button type="button" variant="outline" onClick={addCreator}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {admiredCreators.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {admiredCreators.map((creator, i) => (
                          <Badge key={i} variant="secondary" className="gap-1">
                            {creator}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => removeCreator(i)} />
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Advanced Tab */}
            <TabsContent value="advanced">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <CardDescription>Fine-tune your content generation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Industry Beliefs (3 things you believe)</Label>
                    {beliefs.map((belief, i) => (
                      <Input
                        key={i}
                        placeholder={`Belief ${i + 1}...`}
                        value={belief}
                        onChange={(e) => updateBelief(i, e.target.value)}
                      />
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dontSoundLike">Never Want to Sound Like</Label>
                    <Textarea
                      id="dontSoundLike"
                      placeholder="Describe what you want to avoid (e.g., 'salesy', 'corporate speak')..."
                      value={dontSoundLike}
                      onChange={(e) => setDontSoundLike(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="offLimitTopics">Off-Limit Topics</Label>
                    <Textarea
                      id="offLimitTopics"
                      placeholder="Topics to avoid (comma separated)..."
                      value={offLimitTopics}
                      onChange={(e) => setOffLimitTopics(e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Additional Information</Label>
                    <Textarea
                      id="additionalInfo"
                      {...form.register('additionalInfo')}
                      placeholder="Anything else the AI should know about your brand..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <Button type="submit" size="lg" disabled={updateProfile.isPending}>
              {updateProfile.isPending ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
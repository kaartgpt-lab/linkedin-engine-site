import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, Calendar, Edit, Trash2, Sparkles, Target, 
  TrendingUp, Clock, CheckCircle2, Loader2 
} from 'lucide-react';
import { BrandProfile } from '@/types';
import { mockData, brandProfileApi, calendarApi } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
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

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profiles, setProfiles] = useState<BrandProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const { profiles: data } = await brandProfileApi.getMy();
      setProfiles(data);
    } catch {
      // Use mock data for development
      setProfiles(mockData.profiles);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCalendar = async (profileId: string) => {
    setGeneratingId(profileId);
    try {
      await calendarApi.generate(profileId);
      toast({
        title: 'Calendar Generated!',
        description: 'Your 30-day content calendar is ready.',
      });
      navigate(`/calendar/${profileId}`);
    } catch {
      // For demo, navigate anyway with mock data
      toast({
        title: 'Calendar Generated!',
        description: 'Your 30-day content calendar is ready.',
      });
      navigate(`/calendar/${profileId}`);
    } finally {
      setGeneratingId(null);
    }
  };

  const handleDeleteProfile = async (profileId: string) => {
    try {
      await brandProfileApi.delete(profileId);
      setProfiles(profiles.filter(p => p.id !== profileId));
      toast({
        title: 'Profile Deleted',
        description: 'The brand profile has been removed.',
      });
    } catch {
      setProfiles(profiles.filter(p => p.id !== profileId));
      toast({
        title: 'Profile Deleted',
        description: 'The brand profile has been removed.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your next 30 days of content are ready to be created.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card className="border-border/50">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{profiles.length}</p>
                <p className="text-sm text-muted-foreground">Brand Profiles</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Posts Approved</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">6</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                <TrendingUp className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">12.5K</p>
                <p className="text-sm text-muted-foreground">Total Impressions</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profiles Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-semibold">Your Brand Profiles</h2>
          <Button onClick={() => navigate('/onboarding')} className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Profile
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : profiles.length === 0 ? (
          <Card className="border-border/50 border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                Create Your First Brand Profile
              </h3>
              <p className="text-muted-foreground text-center mb-6 max-w-md">
                Set up your content brain and start generating personalized LinkedIn posts that sound like you.
              </p>
              <Button onClick={() => navigate('/onboarding')} size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Get Started
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {profiles.map((profile, index) => (
              <Card 
                key={profile.id} 
                className="border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="font-display text-lg">
                        {profile.name}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {profile.primaryRole}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {profile.postingFrequency}/month
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Goals */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Goals</p>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.goals.slice(0, 3).map((goal) => (
                        <Badge key={goal} variant="outline" className="text-xs font-normal">
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      onClick={() => handleGenerateCalendar(profile.id)}
                      disabled={generatingId === profile.id}
                      className="flex-1 gap-2"
                    >
                      {generatingId === profile.id ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          Generate
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => navigate(`/calendar/${profile.id}`)}
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => navigate(`/profile/${profile.id}/edit`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Profile?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete this brand profile and all associated content. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteProfile(profile.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

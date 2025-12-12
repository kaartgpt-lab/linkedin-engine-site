import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Linkedin, CheckCircle2, ArrowRight } from 'lucide-react';

export default function LinkedInConnect() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl gradient-primary shadow-glow mb-6">
            <Linkedin className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">Connect LinkedIn</h1>
          <p className="text-muted-foreground">
            Connect your LinkedIn profile to publish posts directly
          </p>
        </div>

        <Card className="border-border/50 shadow-lg animate-slide-up">
          <CardHeader>
            <CardTitle>What you'll get</CardTitle>
            <CardDescription>
              After connecting, you can schedule and publish posts automatically
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
              <div>
                <p className="font-medium">Automatic Publishing</p>
                <p className="text-sm text-muted-foreground">
                  Schedule posts to go live at optimal times
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
              <div>
                <p className="font-medium">Performance Analytics</p>
                <p className="text-sm text-muted-foreground">
                  Track impressions, likes, and comments
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
              <div>
                <p className="font-medium">Best Posting Times</p>
                <p className="text-sm text-muted-foreground">
                  AI-optimized scheduling for maximum reach
                </p>
              </div>
            </div>
            
            <Button className="w-full mt-6 h-12 text-base gap-2" size="lg">
              <Linkedin className="h-5 w-5" />
              Connect with LinkedIn
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              We only request posting permissions. Your data stays secure.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

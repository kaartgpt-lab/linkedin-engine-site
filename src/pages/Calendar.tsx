import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/common/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ChevronLeft, ChevronRight, Check, RefreshCw, Edit3, 
  Trash2, Image, Hash, ArrowLeft, Loader2 
} from 'lucide-react';
import { Post } from '@/types';
import { mockData, calendarApi } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function Calendar() {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editedPost, setEditedPost] = useState<Partial<Post>>({});

  useEffect(() => {
    fetchPosts();
  }, [profileId]);

  const fetchPosts = async () => {
    try {
      const { posts: data } = await calendarApi.getPostsByProfile(profileId!);
      setPosts(data);
    } catch {
      setPosts(mockData.posts);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (post: Post) => {
    const updated = { ...post, status: 'approved' as const };
    setPosts(posts.map(p => p.id === post.id ? updated : p));
    toast({ title: 'Post Approved', description: 'Ready for scheduling!' });
  };

  const handleSaveEdit = async () => {
    if (!selectedPost) return;
    
    try {
      const { post } = await calendarApi.updatePost(selectedPost.id, editedPost);
      setPosts(posts.map(p => p.id === selectedPost.id ? post : p));
      setSelectedPost(null);
      toast({ 
        title: 'Post Updated',
        description: 'Your changes have been saved.'
      });
    } catch (error) {
      toast({ 
        title: 'Update Failed',
        description: 'Could not save changes. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleRegenerate = async () => {
    if (!selectedPost) return;
    
    setIsRegenerating(true);
    try {
      const { post } = await calendarApi.regeneratePost(selectedPost.id, selectedPost.pillar);
      
      setPosts(posts.map(p => p.id === selectedPost.id ? post : p));
      setSelectedPost(post);
      setEditedPost({
        hook: post.hook,
        post_body: post.post_body,
        cta: post.cta,
        hashtags: post.hashtags,
        image_idea: post.image_idea,
      });
      
      toast({ 
        title: 'Post Regenerated!',
        description: 'Fresh content generated with AI.'
      });
    } catch (error) {
      toast({ 
        title: 'Regeneration Failed',
        description: 'Could not regenerate post. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  const openEditor = (post: Post) => {
    setSelectedPost(post);
    setEditedPost({
      hook: post.hook,
      post_body: post.post_body,
      cta: post.cta,
      hashtags: post.hashtags,
      image_idea: post.image_idea,
    });
  };

  const approvedCount = posts.filter(p => p.status === 'approved').length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-display text-2xl font-bold">Your 30-Day Calendar</h1>
              <p className="text-muted-foreground">
                {approvedCount} of {posts.length} posts approved
              </p>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Check className="h-4 w-4" />
            Approve All
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Card 
              key={post.id}
              className={cn(
                "border-border/50 hover:shadow-lg transition-all cursor-pointer animate-slide-up",
                post.status === 'approved' && "border-success/50 bg-success/5"
              )}
              style={{ animationDelay: `${index * 30}ms` }}
              onClick={() => openEditor(post)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">
                    Day {post.day}
                  </Badge>
                  <Badge 
                    variant={post.status === 'approved' ? 'default' : 'outline'}
                    className={cn(
                      "text-xs",
                      post.status === 'approved' && "bg-success"
                    )}
                  >
                    {post.status}
                  </Badge>
                </div>
                
                <p className="font-semibold text-sm line-clamp-2 mb-2">{post.hook}</p>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{post.post_body}</p>
                
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">{post.pillar}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Edit Modal */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5" />
              Edit Post - Day {selectedPost?.day}
            </DialogTitle>
          </DialogHeader>
          
          {selectedPost && (
            <div className="space-y-4">
              <div>
                <Label>Hook</Label>
                <Input
                  value={editedPost.hook || ''}
                  onChange={(e) => setEditedPost({ ...editedPost, hook: e.target.value })}
                />
              </div>
              
              <div>
                <Label>Post Body</Label>
                <Textarea
                  value={editedPost.post_body || ''}
                  onChange={(e) => setEditedPost({ ...editedPost, post_body: e.target.value })}
                  rows={6}
                />
              </div>
              
              <div>
                <Label>CTA</Label>
                <Input
                  value={editedPost.cta || ''}
                  onChange={(e) => setEditedPost({ ...editedPost, cta: e.target.value })}
                />
              </div>
              
              <div>
                <Label>Hashtags</Label>
                <Input
                  value={editedPost.hashtags?.join(' ') || ''}
                  onChange={(e) => setEditedPost({ ...editedPost, hashtags: e.target.value.split(' ') })}
                  placeholder="#startup #founder"
                />
              </div>
              
              <div>
                <Label>Image Idea</Label>
                <Input
                  value={editedPost.image_idea || ''}
                  onChange={(e) => setEditedPost({ ...editedPost, image_idea: e.target.value })}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveEdit} className="flex-1">Save Changes</Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleApprove({ ...selectedPost, ...editedPost } as Post)}
                  className="gap-2"
                >
                  <Check className="h-4 w-4" />
                  Approve
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleRegenerate}
                  disabled={isRegenerating}
                  className="gap-2"
                >
                  <RefreshCw className={cn("h-4 w-4", isRegenerating && "animate-spin")} />
                  {isRegenerating ? 'Regenerating...' : 'Regenerate'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft, ChevronRight, Check, RefreshCw, Edit3, 
  Trash2, Image, Hash, ArrowLeft, Loader2, Sparkles 
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
  const [isSaving, setIsSaving] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [optimizing, setOptimizing] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editedPost, setEditedPost] = useState<Partial<Post>>({});
  
  // AI optimization results
  const [hooks, setHooks] = useState<string[]>([]);
  const [ctas, setCtas] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [imageIdea, setImageIdea] = useState('');

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
    
    setIsSaving(true);
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
    } finally {
      setIsSaving(false);
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
    // Reset optimization results
    setHooks([]);
    setCtas([]);
    setHashtags([]);
    setImageIdea('');
  };

  const handleOptimizeHooks = async () => {
    if (!selectedPost || !profileId) return;

    setOptimizing('hooks');
    try {
      const response = await calendarApi.optimizeHooks({
        brand_profile_id: profileId,
        role: selectedPost.role,
        post_body: editedPost.post_body || selectedPost.post_body,
      });

      setHooks(response.hooks);
      toast({
        title: 'Success',
        description: 'Hooks optimized!',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to optimize hooks',
        variant: 'destructive',
      });
    } finally {
      setOptimizing(null);
    }
  };

  const handleGenerateCTAs = async () => {
    if (!selectedPost || !profileId) return;

    setOptimizing('ctas');
    try {
      const response = await calendarApi.generateCTAs({
        brand_profile_id: profileId,
        role: selectedPost.role,
        post_body: editedPost.post_body || selectedPost.post_body,
      });

      setCtas(response.ctas);
      toast({
        title: 'Success',
        description: 'CTAs generated!',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate CTAs',
        variant: 'destructive',
      });
    } finally {
      setOptimizing(null);
    }
  };

  const handleGenerateHashtags = async () => {
    if (!selectedPost || !profileId) return;

    setOptimizing('hashtags');
    try {
      const response = await calendarApi.generateHashtags({
        brand_profile_id: profileId,
        role: selectedPost.role,
        post_body: editedPost.post_body || selectedPost.post_body,
      });

      setHashtags(response.hashtags);
      toast({
        title: 'Success',
        description: 'Hashtags generated!',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate hashtags',
        variant: 'destructive',
      });
    } finally {
      setOptimizing(null);
    }
  };

  const handleGenerateImageIdea = async () => {
    if (!selectedPost || !profileId) return;

    setOptimizing('image');
    try {
      const response = await calendarApi.generateImageIdea({
        brand_profile_id: profileId,
        role: selectedPost.role,
        post_body: editedPost.post_body || selectedPost.post_body,
      });

      setImageIdea(response.image_idea);
      toast({
        title: 'Success',
        description: 'Image idea generated!',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate image idea',
        variant: 'destructive',
      });
    } finally {
      setOptimizing(null);
    }
  };

  const handleTransformStyle = async (style: 'shorten' | 'expand' | 'raw' | 'punchy' | 'story') => {
    if (!selectedPost || !profileId) return;

    setOptimizing(style);
    try {
      const response = await calendarApi.transformPostStyle({
        brand_profile_id: profileId,
        role: selectedPost.role,
        post_body: editedPost.post_body || selectedPost.post_body,
        style,
      });

      setEditedPost({
        ...editedPost,
        post_body: response.post,
      });
      
      toast({
        title: 'Success',
        description: `Post transformed to ${style} style!`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to transform post',
        variant: 'destructive',
      });
    } finally {
      setOptimizing(null);
    }
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5" />
              Edit Post - Day {selectedPost?.day}
            </DialogTitle>
          </DialogHeader>
          
          {selectedPost && (
            <Tabs defaultValue="edit" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="edit">Edit Post</TabsTrigger>
                <TabsTrigger value="optimize">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Optimize
                </TabsTrigger>
              </TabsList>

              {/* Edit Tab */}
              <TabsContent value="edit" className="space-y-4 mt-4">
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
                    rows={8}
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
                  <Button 
                    onClick={handleSaveEdit} 
                    className="flex-1"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
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
              </TabsContent>

              {/* Optimize Tab */}
              <TabsContent value="optimize" className="mt-4">
                <Tabs defaultValue="style" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="style">Style</TabsTrigger>
                    <TabsTrigger value="hooks">Hooks</TabsTrigger>
                    <TabsTrigger value="ctas">CTAs</TabsTrigger>
                    <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
                    <TabsTrigger value="image">Image</TabsTrigger>
                  </TabsList>

                  {/* Style Tab */}
                  <TabsContent value="style" className="space-y-4">
                    <p className="text-sm text-muted-foreground">Transform your post into different styles</p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleTransformStyle('shorten')}
                        disabled={optimizing === 'shorten'}
                      >
                        {optimizing === 'shorten' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Shorten'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleTransformStyle('expand')}
                        disabled={optimizing === 'expand'}
                      >
                        {optimizing === 'expand' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Expand'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleTransformStyle('raw')}
                        disabled={optimizing === 'raw'}
                      >
                        {optimizing === 'raw' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Make Raw'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleTransformStyle('punchy')}
                        disabled={optimizing === 'punchy'}
                      >
                        {optimizing === 'punchy' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Make Punchy'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleTransformStyle('story')}
                        disabled={optimizing === 'story'}
                      >
                        {optimizing === 'story' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Story Style'}
                      </Button>
                    </div>
                    <Separator />
                    <div className="p-4 bg-accent/50 rounded-lg">
                      <Label className="text-xs text-muted-foreground">CURRENT POST BODY</Label>
                      <p className="mt-2 text-sm whitespace-pre-wrap">{editedPost.post_body || selectedPost.post_body}</p>
                    </div>
                  </TabsContent>

                  {/* Hooks Tab */}
                  <TabsContent value="hooks" className="space-y-4">
                    <p className="text-sm text-muted-foreground">Generate alternative hooks (&lt; 8 words, high stopping power)</p>
                    
                    {editedPost.hook && (
                      <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                        <Label className="text-xs text-muted-foreground">CURRENT HOOK</Label>
                        <p className="mt-1 font-medium">{editedPost.hook}</p>
                      </div>
                    )}
                    
                    <Button
                      onClick={handleOptimizeHooks}
                      disabled={optimizing === 'hooks'}
                      className="w-full"
                    >
                      {optimizing === 'hooks' ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate 5 Hook Options
                        </>
                      )}
                    </Button>
                    {hooks.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">CLICK TO USE</Label>
                        {hooks.map((hook, index) => (
                          <div
                            key={index}
                            className={cn(
                              "p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors",
                              editedPost.hook === hook && "bg-primary/10 border-primary"
                            )}
                            onClick={() => {
                              setEditedPost({ ...editedPost, hook });
                              toast({
                                title: 'Hook Updated',
                                description: 'Click "Save Changes" to apply',
                              });
                            }}
                          >
                            <p className="font-medium">{hook}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  {/* CTAs Tab */}
                  <TabsContent value="ctas" className="space-y-4">
                    <p className="text-sm text-muted-foreground">Generate call-to-action options aligned with your goals</p>
                    
                    {editedPost.cta && (
                      <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                        <Label className="text-xs text-muted-foreground">CURRENT CTA</Label>
                        <p className="mt-1">{editedPost.cta}</p>
                      </div>
                    )}
                    
                    <Button
                      onClick={handleGenerateCTAs}
                      disabled={optimizing === 'ctas'}
                      className="w-full"
                    >
                      {optimizing === 'ctas' ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate 5 CTA Options
                        </>
                      )}
                    </Button>
                    {ctas.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">CLICK TO USE</Label>
                        {ctas.map((cta, index) => (
                          <div
                            key={index}
                            className={cn(
                              "p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors",
                              editedPost.cta === cta && "bg-primary/10 border-primary"
                            )}
                            onClick={() => {
                              setEditedPost({ ...editedPost, cta });
                              toast({
                                title: 'CTA Updated',
                                description: 'Click "Save Changes" to apply',
                              });
                            }}
                          >
                            <p>{cta}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  {/* Hashtags Tab */}
                  <TabsContent value="hashtags" className="space-y-4">
                    <p className="text-sm text-muted-foreground">Generate niche-relevant hashtags (no generic ones)</p>
                    
                    {editedPost.hashtags && editedPost.hashtags.length > 0 && (
                      <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                        <Label className="text-xs text-muted-foreground">CURRENT HASHTAGS</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {editedPost.hashtags.map((tag, index) => (
                            <Badge key={index} variant="secondary">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <Button
                      onClick={handleGenerateHashtags}
                      disabled={optimizing === 'hashtags'}
                      className="w-full"
                    >
                      {optimizing === 'hashtags' ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate Hashtag Options
                        </>
                      )}
                    </Button>
                    {hashtags.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">CLICK TO ADD</Label>
                        <div className="flex flex-wrap gap-2">
                          {hashtags.map((tag, index) => {
                            const currentHashtags = editedPost.hashtags || selectedPost.hashtags || [];
                            const isAdded = currentHashtags.includes(tag);
                            
                            return (
                              <Badge
                                key={index}
                                variant={isAdded ? "default" : "outline"}
                                className={cn(
                                  "cursor-pointer transition-colors",
                                  !isAdded && "hover:bg-accent",
                                  isAdded && "bg-primary"
                                )}
                                onClick={() => {
                                  if (!isAdded) {
                                    setEditedPost({
                                      ...editedPost,
                                      hashtags: [...currentHashtags, tag],
                                    });
                                    toast({
                                      title: 'Hashtag Added',
                                      description: 'Click "Save Changes" to apply',
                                    });
                                  }
                                }}
                              >
                                {tag}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  {/* Image Tab */}
                  <TabsContent value="image" className="space-y-4">
                    <p className="text-sm text-muted-foreground">Generate simple, role-aligned image ideas (easy to create in Canva/Figma)</p>
                    
                    {editedPost.image_idea && (
                      <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                        <Label className="text-xs text-muted-foreground">CURRENT IMAGE IDEA</Label>
                        <p className="mt-1 text-sm">{editedPost.image_idea}</p>
                      </div>
                    )}
                    
                    <Button
                      onClick={handleGenerateImageIdea}
                      disabled={optimizing === 'image'}
                      className="w-full"
                    >
                      {optimizing === 'image' ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate Image Idea
                        </>
                      )}
                    </Button>
                    {imageIdea && (
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">GENERATED IDEA</Label>
                        <div className={cn(
                          "p-4 border rounded-lg transition-colors",
                          editedPost.image_idea === imageIdea ? "bg-primary/10 border-primary" : "bg-accent/50"
                        )}>
                          <p className="text-sm">{imageIdea}</p>
                          <Button
                            variant={editedPost.image_idea === imageIdea ? "default" : "outline"}
                            size="sm"
                            className="mt-3"
                            onClick={() => {
                              setEditedPost({ ...editedPost, image_idea: imageIdea });
                              toast({
                                title: 'Image Idea Updated',
                                description: 'Click "Save Changes" to apply',
                              });
                            }}
                          >
                            {editedPost.image_idea === imageIdea ? 'Using This Idea' : 'Use This Idea'}
                          </Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>

                <Separator className="my-4" />
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSaveEdit} 
                    className="flex-1"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleApprove({ ...selectedPost, ...editedPost } as Post)}
                    className="gap-2"
                  >
                    <Check className="h-4 w-4" />
                    Approve
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

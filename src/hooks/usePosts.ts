import { useQuery, useMutation, useQueryClient } from '@tantml:react-query';
import { calendarApi } from '@/services/api';
import { Post } from '@/types';
import { useToast } from '@/hooks/use-toast';

// Query keys
export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (profileId: string) => [...postKeys.lists(), profileId] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
};

// Get posts for a profile
export function usePosts(profileId: string) {
  return useQuery({
    queryKey: postKeys.list(profileId),
    queryFn: async () => {
      const { posts } = await calendarApi.getPostsByProfile(profileId);
      return posts;
    },
    enabled: !!profileId,
  });
}

// Generate calendar
export function useGenerateCalendar() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (profileId: string) => calendarApi.generate(profileId),
    onSuccess: ({ posts }, profileId) => {
      queryClient.invalidateQueries({ queryKey: postKeys.list(profileId) });
      toast({
        title: 'Calendar generated!',
        description: `Successfully generated ${posts.length} posts.`,
      });
      return posts;
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate calendar',
        variant: 'destructive',
      });
    },
  });
}

// Update post
export function useUpdatePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Post> }) =>
      calendarApi.updatePost(id, data),
    onSuccess: ({ post }) => {
      queryClient.invalidateQueries({ queryKey: postKeys.list(post.brand_profile_id) });
      toast({
        title: 'Post updated!',
        description: 'Your changes have been saved.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update post',
        variant: 'destructive',
      });
    },
  });
}

// Delete post
export function useDeletePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, profileId }: { id: string; profileId: string }) =>
      calendarApi.deletePost(id).then(() => profileId),
    onSuccess: (profileId) => {
      queryClient.invalidateQueries({ queryKey: postKeys.list(profileId) });
      toast({
        title: 'Post deleted',
        description: 'The post has been removed.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete post',
        variant: 'destructive',
      });
    },
  });
}

// Regenerate post
export function useRegeneratePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, pillar }: { id: string; pillar?: string }) =>
      calendarApi.regeneratePost(id, pillar),
    onSuccess: ({ post }) => {
      queryClient.invalidateQueries({ queryKey: postKeys.list(post.brand_profile_id) });
      toast({
        title: 'Post regenerated!',
        description: 'Fresh content generated with AI.',
      });
      return post;
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to regenerate post',
        variant: 'destructive',
      });
    },
  });
}

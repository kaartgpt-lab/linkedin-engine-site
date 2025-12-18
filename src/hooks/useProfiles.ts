import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { brandProfileApi } from '@/services/api';
import { BrandProfile } from '@/types';
import { useToast } from '@/hooks/use-toast';

// Query keys
export const profileKeys = {
  all: ['profiles'] as const,
  lists: () => [...profileKeys.all, 'list'] as const,
  list: () => [...profileKeys.lists()] as const,
  details: () => [...profileKeys.all, 'detail'] as const,
  detail: (id: string) => [...profileKeys.details(), id] as const,
};

// Get all profiles
export function useProfiles() {
  return useQuery({
    queryKey: profileKeys.list(),
    queryFn: async () => {
      const { profiles } = await brandProfileApi.getMy();
      return profiles;
    },
  });
}

// Get single profile
export function useProfile(id: string) {
  return useQuery({
    queryKey: profileKeys.detail(id),
    queryFn: async () => {
      const { profile } = await brandProfileApi.getById(id);
      return profile;
    },
    enabled: !!id,
  });
}

// Create profile
export function useCreateProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: Partial<BrandProfile>) => brandProfileApi.create(data),
    onSuccess: ({ profile }) => {
      queryClient.invalidateQueries({ queryKey: profileKeys.list() });
      toast({
        title: 'Profile created!',
        description: 'Your brand profile has been created successfully.',
      });
      return profile;
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create profile',
        variant: 'destructive',
      });
    },
  });
}

// Update profile
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BrandProfile> }) =>
      brandProfileApi.update(id, data),
    onSuccess: ({ profile }) => {
      queryClient.invalidateQueries({ queryKey: profileKeys.list() });
      queryClient.invalidateQueries({ queryKey: profileKeys.detail(profile.id) });
      toast({
        title: 'Profile updated!',
        description: 'Your changes have been saved.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      });
    },
  });
}

// Delete profile
export function useDeleteProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => brandProfileApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.list() });
      toast({
        title: 'Profile deleted',
        description: 'Your brand profile has been deleted.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete profile',
        variant: 'destructive',
      });
    },
  });
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contentPillarApi } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

// Query keys
export const pillarKeys = {
  all: ['pillars'] as const,
  lists: () => [...pillarKeys.all, 'list'] as const,
  list: (profileId: string) => [...pillarKeys.lists(), profileId] as const,
};

// Get pillars for a profile
export function usePillars(profileId: string) {
  return useQuery({
    queryKey: pillarKeys.list(profileId),
    queryFn: async () => {
      const { pillars } = await contentPillarApi.getByProfile(profileId);
      return pillars;
    },
    enabled: !!profileId,
  });
}

// Create pillar
export function useCreatePillar() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: { name: string; brand_profile_id: string }) =>
      contentPillarApi.create(data),
    onSuccess: ({ pillar }) => {
      queryClient.invalidateQueries({ queryKey: pillarKeys.list(pillar.brand_profile_id) });
      toast({
        title: 'Pillar added!',
        description: 'Content pillar has been added.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create pillar',
        variant: 'destructive',
      });
    },
  });
}

// Delete pillar
export function useDeletePillar() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, profileId }: { id: string; profileId: string }) =>
      contentPillarApi.delete(id).then(() => profileId),
    onSuccess: (profileId) => {
      queryClient.invalidateQueries({ queryKey: pillarKeys.list(profileId) });
      toast({
        title: 'Pillar deleted',
        description: 'Content pillar has been removed.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete pillar',
        variant: 'destructive',
      });
    },
  });
}

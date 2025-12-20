import { User, BrandProfile, ContentPillar, Post } from '@/types';

const API_BASE_URL = 'http://localhost:5050/api/v1';

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // For cookie-based auth
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    // For development, return mock data if API is unavailable
    console.warn('API call failed, using mock data:', error);
    throw error;
  }
}

// Auth API
export const authApi = {
  register: (data: { name: string; email: string; password: string }) =>
    apiCall<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    apiCall<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: () =>
    apiCall<{ message: string }>('/auth/logout', {
      method: 'POST',
    }),

  getUser: () => apiCall<{ user: User }>('/users'),

  forgotPassword: (email: string) =>
    apiCall<{ message: string }>('/password/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  verifyResetToken: (token: string) =>
    apiCall<{ valid: boolean; email: string }>(`/password/verify-token/${token}`),

  resetPassword: (token: string, password: string) =>
    apiCall<{ message: string }>('/password/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    }),
};

// Brand Profile API
export const brandProfileApi = {
  create: (data: Partial<BrandProfile>) =>
    apiCall<{ profile: BrandProfile }>('/brand-profile', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMy: () => apiCall<{ profiles: BrandProfile[] }>('/brand-profile/my'),

  getById: (id: string) =>
    apiCall<{ profile: BrandProfile }>(`/brand-profile/${id}`),

  update: (id: string, data: Partial<BrandProfile>) =>
    apiCall<{ profile: BrandProfile }>(`/brand-profile/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    apiCall<{ message: string }>(`/brand-profile/${id}`, {
      method: 'DELETE',
    }),
};

// Content Pillar API
export const contentPillarApi = {
  create: (data: { name: string; brand_profile_id: string }) =>
    apiCall<{ pillar: ContentPillar }>('/content-pillar', {
      method: 'POST',
      body: JSON.stringify({ 
        pillar_name: data.name, 
        brand_profile_id: parseInt(data.brand_profile_id, 10) 
      }),
    }),

  getByProfile: (profileId: string) =>
    apiCall<{ pillars: ContentPillar[] }>(`/content-pillar/profile/${profileId}`),

  delete: (id: string) =>
    apiCall<{ message: string }>(`/content-pillar/${id}`, {
      method: 'DELETE',
    }),
};

// Calendar/Posts API
export const calendarApi = {
  generate: (profileId: string, regenerate: boolean = false) =>
    apiCall<{ posts: Post[] }>('/generate/calendar', {
      method: 'POST',
      body: JSON.stringify({ 
        brand_profile_id: parseInt(profileId, 10),
        regenerate 
      }),
    }),

  checkExists: (profileId: string) =>
    apiCall<{ posts: Post[] }>(`/posts/profile/${profileId}`)
      .then(response => ({ exists: response.posts.length > 0, count: response.posts.length }))
      .catch(() => ({ exists: false, count: 0 })),

  getPostsByProfile: (profileId: string) =>
    apiCall<{ posts: Post[] }>(`/posts/profile/${profileId}`),

  updatePost: (id: string, data: Partial<Post>) =>
    apiCall<{ post: Post }>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deletePost: (id: string) =>
    apiCall<{ message: string }>(`/posts/${id}`, {
      method: 'DELETE',
    }),

  regeneratePost: (id: string, pillar?: string) =>
    apiCall<{ post: Post; message: string }>(`/posts/${id}/regenerate`, {
      method: 'POST',
      body: JSON.stringify({ pillar }),
    }),
};

// Mock Data for Development
export const mockData = {
  user: {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    created_at: new Date().toISOString(),
  } as User,

  profiles: [
    {
      id: '1',
      user_id: '1',
      name: 'Tech Founder Brand',
      roles: [
        {
          id: '1',
          name: 'SaaS Founder',
          companyName: 'TechStartup Inc',
          description: 'Building the future of productivity',
          audience: 'Startup founders and tech leaders',
          offer: 'SaaS productivity tools',
          whyItMatters: 'This is my main focus and passion',
          importance: 'high' as const,
        },
      ],
      primaryRole: 'SaaS Founder',
      goals: ['Build audience', 'Get clients/inbound'],
      postingFrequency: 12,
      toneProfile: {
        casualToFormal: 3,
        rawToPolished: 4,
        punchyToStorytelling: 7,
        boldToSafe: 3,
      },
      admiredCreators: ['@naval', '@alexhormozi'],
      beliefs: ['Build in public works', 'Community over competition'],
      dontSoundLike: ['Corporate'],
      offLimitTopics: ['Politics'],
      pastPosts: [],
      additionalInfo: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ] as BrandProfile[],

  posts: Array.from({ length: 30 }, (_, i) => ({
    id: String(i + 1),
    brand_profile_id: '1',
    day: i + 1,
    date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    role: 'SaaS Founder',
    pillar: ['Founder journey', 'Behind-the-scenes', 'Expertise / educational', 'Opinions / rants'][i % 4],
    hook: [
      'I almost quit yesterday.',
      'Nobody tells you this about fundraising.',
      'The best decision I made this year.',
      'Stop doing this on LinkedIn.',
      'Here\'s what 1000 customers taught me.',
    ][i % 5],
    post_body: 'This is a sample post body that would contain the full content of the LinkedIn post. It should be engaging, follow the user\'s tone profile, and provide value to the audience.',
    cta: 'Follow for more insights on building startups.',
    hashtags: ['#startup', '#founder', '#saas', '#entrepreneurship'],
    image_idea: 'A simple chart showing growth metrics or a behind-the-scenes photo',
    status: i < 5 ? 'approved' : 'draft' as const,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })) as Post[],
};

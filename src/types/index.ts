// Auth Types
export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Role Types
export interface UserRole {
  id: string;
  name: string;
  companyName?: string;
  description: string;
  audience: string;
  offer: string;
  whyItMatters: string;
  importance: 'high' | 'medium' | 'low';
}

export const ROLE_OPTIONS = [
  'SaaS Founder',
  'Agency Owner',
  'Consultant',
  'Creator',
  'Freelancer',
  'Investor',
  'Operator',
  'Side Project Builder',
  'Community Builder',
  'Speaker',
  'Other'
] as const;

// Goals Types
export const GOAL_OPTIONS = [
  'Build audience',
  'Get clients/inbound',
  'Attract talent',
  'Build investor visibility',
  'Authority in industry',
  'Document journey'
] as const;

// Posting Frequency
export const FREQUENCY_OPTIONS = [
  { value: 3, label: '3/month', description: 'Light presence' },
  { value: 8, label: '8/month', description: '2x per week' },
  { value: 12, label: '12/month', description: '3x per week' },
  { value: 20, label: '20/month', description: '5x per week' },
  { value: 30, label: '30/month', description: 'Daily' }
] as const;

// Content Pillars
export const PILLAR_OPTIONS = [
  'Founder journey',
  'Behind-the-scenes',
  'Expertise / educational',
  'Opinions / rants',
  'Industry takes',
  'Wins & losses',
  'Team / culture',
  'Product & vision'
] as const;

export interface ContentPillar {
  id: string;
  name: string;
  brand_profile_id: string;
}

// Tone Profile
export interface ToneProfile {
  casualToFormal: number;
  rawToPolished: number;
  punchyToStorytelling: number;
  boldToSafe: number;
}

// Brand Profile
export interface BrandProfile {
  id: string;
  user_id: string;
  name: string;
  roles: UserRole[];
  primaryRole: string;
  goals: string[];
  postingFrequency: number;
  toneProfile: ToneProfile;
  admiredCreators: string[];
  beliefs: string[];
  dontSoundLike: string[];
  offLimitTopics: string[];
  pastPosts: string[];
  additionalInfo: string;
  created_at: string;
  updated_at: string;
}

// Post Types
export interface Post {
  id: string;
  brand_profile_id: string;
  day: number;
  date: string;
  role: string;
  pillar: string;
  hook: string;
  post_body: string;
  cta: string;
  hashtags: string[];
  image_idea: string;
  status: 'draft' | 'approved' | 'scheduled' | 'published';
  created_at: string;
  updated_at: string;
}

// Onboarding State
export interface OnboardingState {
  step: number;
  name: string;
  selectedRoles: string[];
  roleDetails: Record<string, Partial<UserRole>>;
  goals: string[];
  postingFrequency: number;
  contentPillars: string[];
  customPillars: string[];
  toneProfile: ToneProfile;
  admiredCreators: string[];
  beliefs: string[];
  dontSoundLike: string;
  offLimitTopics: string;
  pastPosts: string[];
  additionalInfo: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

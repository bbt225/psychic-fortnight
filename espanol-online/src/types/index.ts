// All TypeScript types for the entire application
export type CEFRLevel = 'Базовый' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
export type UserRole = 'guest' | 'user' | 'premium' | 'admin';
export type SubscriptionPlan = 'free' | 'monthly' | 'quarterly' | 'annual';
export type TestType = 'multiple-choice' | 'fill-blank' | 'matching' | 'audio' | 'translation' | 'sentence-order';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  subscription: SubscriptionPlan;
  profile: UserProfile;
  createdAt: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  avatar?: string;
  currentLevel: CEFRLevel;
  totalXP: number;
  streak: number;
}

export interface Level {
  id: string;
  name: CEFRLevel;
  description: string;
  order: number;
  lessonCount: number;
  color: string;
}

export interface Vocabulary {
  id: string;
  word: string;
  translation: string;
  example: string;
  audioUrl?: string;
}

export interface Test {
  id: string;
  type: TestType;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
}

export interface Lesson {
  id: string;
  levelId: CEFRLevel;
  title: string;
  description: string;
  order: number;
  duration: number;
  isFree: boolean;
  content: {
    introduction: string;
    vocabulary: Vocabulary[];
    grammar: { rule: string; examples: string[] };
    reading: string;
    phrases: string[];
  };
  tests: Test[];
  homework: Test[];
}

export interface Progress {
  userId: string;
  lessonId: string;
  completed: boolean;
  score: number;
  attempts: number;
  lastAttempt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'cancelled' | 'expired';
  startDate: string;
  endDate: string;
  price: number;
}

import { create } from 'zustand';
import type { User, Lesson, Progress, SubscriptionPlan } from '../types';
import { LESSONS_DATA } from '../data/lessonGenerator';

interface Store {
  user: User | null;
  lessons: Lesson[];
  progress: Progress[];
  setUser: (user: User | null) => void;
  updateSubscription: (plan: SubscriptionPlan) => void;
  completeLesson: (lessonId: string, score: number) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  lessons: LESSONS_DATA,
  progress: [],
  setUser: (user) => set({ user }),
  updateSubscription: (plan) => set((state) => state.user ? { user: { ...state.user, subscription: plan } } : {}),
  completeLesson: (lessonId, score) => set((state) => ({
    progress: [...state.progress.filter(p => p.lessonId !== lessonId), {
      userId: state.user?.id || '',
      lessonId,
      completed: score >= 70,
      score,
      attempts: 1,
      lastAttempt: new Date().toISOString(),
    }],
  })),
}));

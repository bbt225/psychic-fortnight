import { create } from 'zustand';
import type { User, Lesson, Progress, SubscriptionPlan } from '../types';
import { LESSONS_DATA } from '../data/lessonGenerator';

// localStorage helpers
const STORAGE_KEYS = {
  USER: 'espanol_user',
  PROGRESS: 'espanol_progress',
};

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
};

interface Store {
  user: User | null;
  lessons: Lesson[];
  progress: Progress[];
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, name: string) => void;
  logout: () => void;
  updateSubscription: (plan: SubscriptionPlan) => void;
  completeLesson: (lessonId: string, score: number) => void;
}

export const useStore = create<Store>((set, get) => ({
  user: loadFromStorage<User | null>(STORAGE_KEYS.USER, null),
  lessons: LESSONS_DATA,
  progress: loadFromStorage<Progress[]>(STORAGE_KEYS.PROGRESS, []),

  setUser: (user) => {
    set({ user });
    saveToStorage(STORAGE_KEYS.USER, user);
  },

  login: (email, _password) => {
    // Demo login - any credentials work
    const user: User = {
      id: Date.now().toString(),
      email,
      role: email.includes('admin') ? 'admin' : 'premium',
      subscription: email.includes('admin') ? 'annual' : 'monthly',
      profile: {
        firstName: 'Пользователь',
        lastName: '',
        currentLevel: 'A1',
        totalXP: 0,
        streak: 0,
      },
      createdAt: new Date().toISOString(),
    };
    get().setUser(user);
  },

  register: (email, _password, name) => {
    // Demo registration
    const user: User = {
      id: Date.now().toString(),
      email,
      role: 'user',
      subscription: 'free',
      profile: {
        firstName: name,
        lastName: '',
        currentLevel: 'Базовый',
        totalXP: 0,
        streak: 0,
      },
      createdAt: new Date().toISOString(),
    };
    get().setUser(user);
  },

  logout: () => {
    get().setUser(null);
  },

  updateSubscription: (plan) => {
    const { user } = get();
    if (!user) return;

    const updatedUser = { ...user, subscription: plan };
    get().setUser(updatedUser);
  },

  completeLesson: (lessonId, score) => {
    const { user, progress } = get();
    if (!user) return;

    const existingProgress = progress.find(p => p.lessonId === lessonId);
    const newProgress: Progress = {
      userId: user.id,
      lessonId,
      completed: score >= 70,
      score,
      attempts: existingProgress ? existingProgress.attempts + 1 : 1,
      lastAttempt: new Date().toISOString(),
    };

    const updatedProgress = [
      ...progress.filter(p => p.lessonId !== lessonId),
      newProgress,
    ];

    set({ progress: updatedProgress });
    saveToStorage(STORAGE_KEYS.PROGRESS, updatedProgress);
  },
}));

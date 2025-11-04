import { create } from 'zustand';
import type { User, Lesson, LessonProgress, Notification } from '../types';
import { auth, db } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from 'firebase/firestore';

interface AppStore {
  // State
  user: User | null;
  firebaseUser: FirebaseUser | null;
  lessons: Lesson[];
  progress: LessonProgress[];
  notifications: Notification[];
  loading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setFirebaseUser: (user: FirebaseUser | null) => void;
  setLessons: (lessons: Lesson[]) => void;
  setProgress: (progress: LessonProgress[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'userId' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;

  // Auth actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  initAuth: () => void;

  // Data actions
  fetchLessons: () => Promise<void>;
  fetchUserProgress: (userId: string) => Promise<void>;
  updateLessonProgress: (lessonId: string, score: number, completed: boolean) => Promise<void>;
  updateSubscription: (subscriptionType: 'free' | 'basic' | 'premium') => Promise<void>;
}

export const useStore = create<AppStore>((set, get) => ({
  // Initial state
  user: null,
  firebaseUser: null,
  lessons: [],
  progress: [],
  notifications: [],
  loading: false,
  error: null,

  // Setters
  setUser: (user) => set({ user }),
  setFirebaseUser: (firebaseUser) => set({ firebaseUser }),
  setLessons: (lessons) => set({ lessons }),
  setProgress: (progress) => set({ progress }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      userId: get().user?.uid || '',
      read: false,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto-remove after 5 seconds
    setTimeout(() => {
      get().removeNotification(newNotification.id);
    }, 5000);
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  // Auth actions
  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        set({ user: userData, firebaseUser });

        // Update last login
        await updateDoc(doc(db, 'users', firebaseUser.uid), {
          lastLoginAt: new Date().toISOString(),
        });

        get().addNotification({
          type: 'success',
          title: 'Успешный вход',
          message: `Добро пожаловать, ${userData.displayName || userData.email}!`,
          read: false,
        });
      }
    } catch (error: any) {
      const errorMessage = error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found'
        ? 'Неверный email или пароль'
        : 'Ошибка входа. Попробуйте снова.';
      set({ error: errorMessage });
      get().addNotification({
        type: 'error',
        title: 'Ошибка входа',
        message: errorMessage,
        read: false,
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signUp: async (email, password, displayName) => {
    try {
      set({ loading: true, error: null });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Create user document in Firestore
      const newUser: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName,
        role: 'user',
        subscription: 'free',
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
      set({ user: newUser, firebaseUser });

      get().addNotification({
        type: 'success',
        title: 'Регистрация успешна',
        message: 'Добро пожаловать в онлайн-школу испанского языка!',
        read: false,
      });
    } catch (error: any) {
      const errorMessage =
        error.code === 'auth/email-already-in-use'
          ? 'Этот email уже используется'
          : 'Ошибка регистрации. Попробуйте снова.';
      set({ error: errorMessage });
      get().addNotification({
        type: 'error',
        title: 'Ошибка регистрации',
        message: errorMessage,
        read: false,
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      await firebaseSignOut(auth);
      set({ user: null, firebaseUser: null, progress: [] });
      get().addNotification({
        type: 'info',
        title: 'Выход выполнен',
        message: 'До скорой встречи!',
        read: false,
      });
    } catch (error: any) {
      set({ error: 'Ошибка выхода' });
      throw error;
    }
  },

  initAuth: () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            set({ user: userData, firebaseUser });
            // Загружаем прогресс пользователя
            await get().fetchUserProgress(firebaseUser.uid);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        set({ user: null, firebaseUser: null, progress: [] });
      }
    });
  },

  // Data actions
  fetchLessons: async () => {
    try {
      set({ loading: true });
      const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
      const lessons = lessonsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Lesson));
      set({ lessons });
    } catch (error) {
      console.error('Error fetching lessons:', error);
      set({ error: 'Ошибка загрузки уроков' });
    } finally {
      set({ loading: false });
    }
  },

  fetchUserProgress: async (userId: string) => {
    try {
      const progressQuery = query(collection(db, 'progress'), where('userId', '==', userId));
      const progressSnapshot = await getDocs(progressQuery);
      const progress = progressSnapshot.docs.map((doc) => doc.data() as LessonProgress);
      set({ progress });
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  },

  updateLessonProgress: async (lessonId: string, score: number, completed: boolean) => {
    const { user, progress } = get();
    if (!user) return;

    try {
      const existingProgress = progress.find((p) => p.lessonId === lessonId);
      const progressData: LessonProgress = {
        lessonId,
        userId: user.uid,
        completed,
        score,
        attempts: existingProgress ? existingProgress.attempts + 1 : 1,
        lastAttemptAt: new Date().toISOString(),
        completedAt: completed ? new Date().toISOString() : existingProgress?.completedAt,
      };

      const progressRef = doc(db, 'progress', `${user.uid}_${lessonId}`);
      await setDoc(progressRef, progressData, { merge: true });

      // Update local state
      set((state) => ({
        progress: state.progress.some((p) => p.lessonId === lessonId)
          ? state.progress.map((p) => (p.lessonId === lessonId ? progressData : p))
          : [...state.progress, progressData],
      }));

      if (completed) {
        get().addNotification({
          type: 'success',
          title: 'Урок пройден!',
          message: `Вы набрали ${score} баллов`,
          read: false,
        });
      }
    } catch (error) {
      console.error('Error updating progress:', error);
      get().addNotification({
        type: 'error',
        title: 'Ошибка',
        message: 'Не удалось сохранить прогресс',
        read: false,
      });
    }
  },

  updateSubscription: async (subscriptionType: 'free' | 'basic' | 'premium') => {
    const { user } = get();
    if (!user) return;

    try {
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 1); // +1 месяц

      await updateDoc(doc(db, 'users', user.uid), {
        subscription: subscriptionType,
        subscriptionExpiresAt: expiresAt.toISOString(),
      });

      set({
        user: {
          ...user,
          subscription: subscriptionType,
          subscriptionExpiresAt: expiresAt.toISOString(),
        },
      });

      get().addNotification({
        type: 'success',
        title: 'Подписка активирована',
        message: `Вы успешно оформили подписку "${subscriptionType}"`,
        read: false,
      });
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw error;
    }
  },
}));

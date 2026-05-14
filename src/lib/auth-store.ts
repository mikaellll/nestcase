'use client';

import { create } from 'zustand';

export type AuthUser = { email: string; name: string };

interface AuthState {
  user: AuthUser | null;
  hydrated: boolean;
  setUser: (user: AuthUser | null) => void;
  fetchMe: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  hydrated: false,
  setUser: (user) => set({ user, hydrated: true }),
  fetchMe: async () => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      if (!res.ok) {
        set({ user: null, hydrated: true });
        return;
      }
      const data = (await res.json()) as { user: AuthUser | null };
      set({ user: data.user ?? null, hydrated: true });
    } catch {
      set({ user: null, hydrated: true });
    }
  },
}));

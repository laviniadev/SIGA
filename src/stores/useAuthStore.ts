import { create } from 'zustand';
import type { User } from '../data/mockUsers';
import { mockUsers } from '../data/mockUsers';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, passwordHash: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  
  login: (email, passwordHash) => {
    // BACKDOOR DEBUG: dev / 123
    if (email === 'dev' && passwordHash === '123') {
      const debugAdmin: User = {
        id: 'debug_admin',
        name: 'Debug Master',
        email: 'dev',
        role: 'admin',
        passwordHash: '123'
      };
      set({ user: debugAdmin, isAuthenticated: true });
      return true;
    }

    const foundUser = mockUsers.find(
      (u) => u.email === email && u.passwordHash === passwordHash
    );
    if (foundUser) {
      set({ user: foundUser, isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));

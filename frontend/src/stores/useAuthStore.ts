import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../data/mockUsers';
import { mockUsers } from '../data/mockUsers';

export interface PaymentCard {
  id: string
  number: string
  name: string
  expiry: string
  isDefault: boolean
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  cards: PaymentCard[]
  login: (email: string, passwordHash: string) => boolean
  logout: () => void
  addCard: (card: PaymentCard) => void
  removeCard: (id: string) => void
  updateCard: (card: PaymentCard) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      cards: [
        { id: '1', number: '•••• •••• •••• 4829', name: 'João Oliveira', expiry: '12/26', isDefault: true },
        { id: '2', number: '•••• •••• •••• 1234', name: 'João Oliveira', expiry: '08/25', isDefault: false }
      ],
      
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

      addCard: (card) => {
        set((state) => {
          let updatedCards = state.cards;
          if (card.isDefault) {
            updatedCards = updatedCards.map(c => ({ ...c, isDefault: false }));
          }
          return { cards: [...updatedCards, card] };
        });
      },

      removeCard: (id) => {
        set((state) => ({
          cards: state.cards.filter(c => c.id !== id)
        }));
      },

      updateCard: (updatedCard) => {
        set((state) => {
          let updatedCards = state.cards;
          if (updatedCard.isDefault) {
            updatedCards = updatedCards.map(c => ({ ...c, isDefault: false }));
          }
          return {
            cards: updatedCards.map(c => c.id === updatedCard.id ? updatedCard : c)
          };
        });
      },
    }),
    {
      name: 'siga-auth-storage',
    }
  )
);

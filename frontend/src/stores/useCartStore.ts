import { create } from 'zustand';
import type { Product } from '../data/mockProducts';

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product, selectedSize: string, selectedColor: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  updateSize: (productId: string, oldSize: string, color: string, newSize: string) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],

  addToCart: (product, selectedSize, selectedColor, quantity = 1) => {
    set((state) => {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...state.cartItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return { cartItems: updatedItems };
      }

      return { cartItems: [...state.cartItems, { ...product, quantity, selectedSize, selectedColor }] };
    });
  },

  removeFromCart: (productId, size, color) => {
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) => !(item.id === productId && item.selectedSize === size && item.selectedColor === color)
      ),
    }));
  },

  updateQuantity: (productId, size, color, quantity) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === productId && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      ),
    }));
  },

  updateSize: (productId, oldSize, color, newSize) => {
    set((state) => {
      // Check if the new size already exists in the cart for this product
      const targetItemIndex = state.cartItems.findIndex(
        (item) => item.id === productId && item.selectedSize === oldSize && item.selectedColor === color
      );
      
      if (targetItemIndex === -1) return state;

      const existingSiblingIndex = state.cartItems.findIndex(
        (item) => item.id === productId && item.selectedSize === newSize && item.selectedColor === color
      );

      const updatedItems = [...state.cartItems];
      const targetItem = updatedItems[targetItemIndex];

      if (existingSiblingIndex !== -1 && existingSiblingIndex !== targetItemIndex) {
        // Merge with existing sibling if new size already exists
        updatedItems[existingSiblingIndex] = {
          ...updatedItems[existingSiblingIndex],
          quantity: updatedItems[existingSiblingIndex].quantity + targetItem.quantity
        };
        // Remove the old item
        updatedItems.splice(targetItemIndex, 1);
      } else {
        // Just update the size
        updatedItems[targetItemIndex] = { ...targetItem, selectedSize: newSize };
      }

      return { cartItems: updatedItems };
    });
  },

  clearCart: () => {
    set({ cartItems: [] });
  },

  cartTotal: () => {
    const { cartItems } = get();
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  cartCount: () => {
    const { cartItems } = get();
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }
}));

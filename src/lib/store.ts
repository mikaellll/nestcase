import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  model: string;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  colors: string[];
  badge?: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, color: string) => void;
  removeItem: (productId: string, color: string) => void;
  updateQuantity: (productId: string, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, color) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          (item) => item.product.id === product.id && item.selectedColor === color
        );

        if (existingIndex !== -1) {
          const newItems = [...items];
          newItems[existingIndex] = {
            ...newItems[existingIndex],
            quantity: newItems[existingIndex].quantity + 1,
          };
          set({ items: newItems, isOpen: true });
        } else {
          set({ items: [...items, { product, quantity: 1, selectedColor: color }], isOpen: true });
        }
      },

      removeItem: (productId, color) => {
        set({
          items: get().items.filter(
            (item) => !(item.product.id === productId && item.selectedColor === color)
          ),
        });
      },

      updateQuantity: (productId, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, color);
          return;
        }
        const newItems = get().items.map((item) =>
          item.product.id === productId && item.selectedColor === color
            ? { ...item, quantity }
            : item
        );
        set({ items: newItems });
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    }),
    {
      name: 'nestcase-cart',
    }
  )
);

"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // product id
  quantity: number;
  variant_id?: string;
}

interface AppState {
  cart: CartItem[];
  favorites: string[];
  user: any;
  addToCart: (id: string, quantity: number, variant_id?: string) => void;
  updateQuantity: (id: string, quantity: number, variant_id?: string) => void;
  removeFromCart: (id: string, variant_id?: string) => void;
  clearCart: () => void;
  toggleFavorite: (id: string, supabase?: any) => Promise<void>;
  setUser: (user: any) => void;
  setFavorites: (favorites: string[]) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      cart: [],
      favorites: [],
      user: null,
      addToCart: (id, quantity, variant_id) => set((state) => {
        const existing = state.cart.find(c => c.id === id && c.variant_id === variant_id);
        if (existing) {
          return { cart: state.cart.map(c => (c.id === id && c.variant_id === variant_id) ? { ...c, quantity: c.quantity + quantity } : c) };
        }
        return { cart: [...state.cart, { id, quantity, variant_id }] };
      }),
      updateQuantity: (id, quantity, variant_id) => set((state) => ({
        cart: state.cart.map(c => (c.id === id && c.variant_id === variant_id) ? { ...c, quantity } : c)
      })),
      removeFromCart: (id, variant_id) => set((state) => ({
        cart: state.cart.filter(c => !(c.id === id && c.variant_id === variant_id))
      })),
      clearCart: () => set({ cart: [] }),
      toggleFavorite: async (id, supabase) => {
        const state = get();
        const isFavorite = state.favorites.includes(id);
        const newFavorites = isFavorite
          ? state.favorites.filter(f => f !== id)
          : [...state.favorites, id];
        
        set({ favorites: newFavorites });

        // Sync with DB if logged in
        if (state.user && supabase) {
          if (isFavorite) {
            await supabase.from('favorites').delete().eq('user_id', state.user.id).eq('product_id', id);
          } else {
            await supabase.from('favorites').insert([{ user_id: state.user.id, product_id: id }]);
          }
        }
      },
      setUser: (user) => set({ user }),
      setFavorites: (favorites) => set({ favorites })
    }),
    { name: 'health_app_storage' }
  )
);

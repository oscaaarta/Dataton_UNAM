import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  slug: string
  name: string
  image: string
  price: number
  quantity: number
  cardMessage: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>, quantity?: number) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clear: () => void
  open: () => void
  close: () => void
}

const MAX_QTY = 99

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (item, quantity = 1) =>
        set((state) => {
          const cardMessage = item.cardMessage.trim()
          const id = `${item.slug}::${cardMessage}`
          const existing = state.items.find((i) => i.id === id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: Math.min(i.quantity + quantity, MAX_QTY) } : i,
              ),
            }
          }
          return { items: [...state.items, { ...item, cardMessage, id, quantity }] }
        }),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, Math.min(quantity, MAX_QTY)) } : i,
          ),
        })),
      removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: 'mata-carrito',
      partialize: (state) => ({ items: state.items }),
    },
  ),
)

export const selectCount = (s: CartState) => s.items.reduce((n, i) => n + i.quantity, 0)
export const selectSubtotal = (s: CartState) =>
  s.items.reduce((n, i) => n + i.price * i.quantity, 0)

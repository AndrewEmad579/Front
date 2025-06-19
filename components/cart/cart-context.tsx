"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  stock: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (product: { id: number; name: string; price: number; image: string; stock: number }) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  itemCount: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  // Initialize cart from localStorage when component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart)
        setItems(parsedCart)
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e)
        localStorage.removeItem("cart")
      }
    }
    setMounted(true)
  }, [])

  // Update localStorage when cart changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("cart", JSON.stringify(items))
      console.log("Cart updated:", items) // Debug log
    }
  }, [items, mounted])

  const addItem = (product: { id: number; name: string; price: number; image: string; stock: number }) => {
    console.log("Adding item to cart:", product) // Debug log
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // If item already exists, check stock limit before increasing quantity
        if (existingItem.quantity >= product.stock) {
          console.log("Cannot add more items: Stock limit reached") // Debug log
          return prevItems
        }
        // If item already exists and under stock limit, increase quantity
        const updatedItems = prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1, stock: product.stock } : item
        )
        console.log("Updated cart items:", updatedItems) // Debug log
        return updatedItems
      } else {
        // Otherwise add new item with quantity 1
        const updatedItems = [...prevItems, { ...product, quantity: 1 }]
        console.log("Updated cart items:", updatedItems) // Debug log
        return updatedItems
      }
    })
  }

  const removeItem = (id: number) => {
    console.log("Removing item from cart:", id) // Debug log
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id)
      console.log("Updated cart items:", updatedItems) // Debug log
      return updatedItems
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return

    console.log("Updating item quantity:", { id, quantity }) // Debug log
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.id === id)
      if (!item || quantity > item.stock) return prevItems

      const updatedItems = prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
      console.log("Updated cart items:", updatedItems) // Debug log
      return updatedItems
    })
  }

  const clearCart = () => {
    console.log("Clearing cart") // Debug log
    setItems([])
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  // Debug log for render
  console.log("Cart state:", { items, itemCount, subtotal })

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

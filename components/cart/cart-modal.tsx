"use client"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { useCart, type CartItem } from "./cart-context"
import { useRouter } from "next/navigation"

interface CartModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartModal({ open, onOpenChange }: CartModalProps) {
  const { items, removeItem, updateQuantity, clearCart, subtotal, itemCount } = useCart()
  const router = useRouter()

  console.log("CartModal render:", { items, itemCount, subtotal }) // Debug log

  const handleCheckout = () => {
    onOpenChange(false)
    router.push("/bazaar/checkout")
  }

  if (itemCount === 0) {
    console.log("Cart is empty") // Debug log
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-[#FFD700]">Your Cart</SheetTitle>
          </SheetHeader>

          <div className="flex flex-col items-center justify-center h-[70vh]">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="text-sm text-muted-foreground mt-1 mb-4">Add some items to your cart to continue shopping</p>
            <SheetClose asChild>
              <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black">Continue Shopping</Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  console.log("Rendering cart with items:", items) // Debug log

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-[#FFD700]">Your Cart ({itemCount} items)</SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-5 overflow-y-auto max-h-[60vh]">
          {items.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-auto pt-4">
          <Separator className="my-4" />

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">$10.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span className="font-medium">${(subtotal * 0.07).toFixed(2)}</span>
            </div>

            <Separator className="my-2" />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-[#FFD700]">${(subtotal + 10 + subtotal * 0.07).toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>

            <div className="flex gap-2">
              <SheetClose asChild>
                <Button variant="outline" className="flex-1">
                  Continue Shopping
                </Button>
              </SheetClose>

              <Button variant="outline" className="flex-1 text-destructive hover:text-destructive" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function CartItemCard({ item }: { item: CartItem }) {
  const { removeItem, updateQuantity } = useCart()

  return (
    <div className="flex gap-4">
      <div className="h-20 w-20 rounded-md overflow-hidden bg-accent shrink-0">
        <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-full w-full object-cover" />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between">
          <h4 className="font-medium line-clamp-1">{item.name}</h4>
          <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <span className="text-[#FFD700] text-sm font-medium">${item.price.toFixed(2)}</span>

        <div className="flex items-center mt-auto">
          <div className="flex items-center border rounded-md">
            <button
              className="px-2 py-1 text-muted-foreground hover:text-foreground disabled:opacity-50"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </button>

            <span className="px-2 text-sm">{item.quantity}</span>

            <button
              className="px-2 py-1 text-muted-foreground hover:text-foreground disabled:opacity-50"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              disabled={item.quantity >= item.stock}
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <span className="ml-auto font-medium">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
        {item.quantity >= item.stock && (
          <span className="text-xs text-yellow-500 mt-1">Max stock reached</span>
        )}
      </div>
    </div>
  )
}

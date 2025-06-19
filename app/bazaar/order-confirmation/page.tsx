"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation" // Correctly import the hook

export default function OrderConfirmationPage() {
  // Use the hook to access URL query parameters
  const searchParams = useSearchParams()
  // Read the 'orderId' that was passed from the checkout page
  const orderId = searchParams.get("orderId")

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-16 h-16 rounded-full bg-[#FFD700]/20 flex items-center justify-center mb-6">
        <CheckCircle className="h-8 w-8 text-[#FFD700]" />
      </div>

      <h1 className="text-2xl font-bold text-[#FFD700] mb-2">Order Confirmed!</h1>
      <p className="text-muted-foreground mb-6 text-center max-w-md">
        Thank you for your purchase. Your order has been received and is being processed.
      </p>

      <Card className="w-full max-w-md mb-8">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Order Number</span>
            {/* Display the real orderId from the URL */}
            <span className="font-medium">#{orderId || "N/A"}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Status</span>
            <span className="font-medium text-green-500">Processing</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Estimated Delivery</span>
            <span className="font-medium">{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/bazaar">
          <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>

        {/* This link now points to a more specific order history page */}
        <Link href="/profile/orders">
          <Button variant="outline">View Order History</Button>
        </Link>
      </div>
    </div>
  )
}
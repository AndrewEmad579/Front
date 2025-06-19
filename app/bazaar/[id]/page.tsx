"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/components/cart/cart-context"
import { useAuth } from "@/contexts/auth-context"
import Head from 'next/head'
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  StarHalf,
  Truck,
  ShieldCheck,
  Package,
  Heart,
  Share2,
  Minus,
  Plus,
  Check,
} from "lucide-react"
import Link from "next/link"
import { bazaarAPI } from "@/utils/bazaarApi"
import { cartAPI } from "@/utils/cartApi"
import { BazaarItem } from "@/types/bazaar"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { addItem } = useCart()
  const { isAuthenticated } = useAuth();
  // --- State Management ---
  const [product, setProduct] = useState<BazaarItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchProduct = async () => {
      const productId = Number(params.id);
      if (isNaN(productId)) {
        setError("Invalid product page.");
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const dataFromApi = await bazaarAPI.getItemById(productId);
        setProduct(dataFromApi as BazaarItem);
      } catch (err: any) {
        setError(err.message || "Failed to load product.");
      } finally {
        setIsLoading(false);
      }
    };
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  // --- Conditional Rendering for UI States ---
  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground">Loading...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }
  if (!product) {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="text-2xl font-bold text-[#FFD700] mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-6 text-center">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link href="/bazaar">
          <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black">Return to Bazaar</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Please Sign In",
        description: "You need to be signed in to add items to your cart.",
        variant: "destructive",
      });
      router.push("/auth/signin");
      return;
    }

    if (!product) return;

    try {
      // Check if we have enough stock
      if (quantity > product.stock) {
        toast({
          title: "Not Enough Stock",
          description: `Only ${product.stock} items available.`,
          variant: "destructive",
        });
        return;
      }

      console.log("Adding items to cart:", { product, quantity }); // Debug log
      
      const cartItem = {
        id: product.item_id,
        name: product.name,
        price: product.price,
        image: product.imageData ? `data:image/jpeg;base64,${product.imageData}` : "/placeholder.svg",
        stock: product.stock
      };
      
      console.log("Updating cart UI with item:", cartItem); // Debug log
      
      // Add items one by one to properly update the cart state
      for (let i = 0; i < quantity; i++) {
        addItem(cartItem);
      }

      // Show a success toast with quantity information
      toast({
        title: "Added to Cart",
        description: `${quantity} ${quantity === 1 ? 'unit' : 'units'} of "${product.name}" ${quantity === 1 ? 'has' : 'have'} been added to your cart.`,
      });

    } catch (err: any) {
      console.error("Error adding items to cart:", err); // Debug log
      toast({
        title: "Error",
        description: err.message || "Could not add items to cart.",
        variant: "destructive",
      });
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
      return;
    }
    await handleAddToCart();
    if (quantity <= product.stock) {  // Only proceed to checkout if add to cart was successful
      router.push("/bazaar/checkout");
    }
  };

  const renderRatingStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-[#FFD700] text-[#FFD700]" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-[#FFD700] text-[#FFD700]" />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground" />)
    }

    return stars
  }

  return (
    <>
      <Head>
        <title>{product ? `${product.name} - Hero Bazaar` : 'Loading... - Hero Bazaar'}</title>
        <meta name="description" content={product?.description || 'Loading product details...'} />
        <meta property="og:title" content={product ? `${product.name} - Hero Bazaar` : 'Hero Bazaar'} />
        <meta property="og:description" content={product?.description || 'Loading product details...'} />
        {product?.imageData && (
          <meta property="og:image" content={`data:image/jpeg;base64,${product.imageData}`} />
        )}
      </Head>
      <div className="p-4 space-y-6 pb-20">
        <div className="flex items-center mb-4">
          <Link href="/bazaar">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              Back to Bazaar
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image - from API */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden border bg-accent relative">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-accent">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFD700]"></div>
                </div>
              )}
              {product.imageData ? (
                <img
                  src={`data:image/jpeg;base64,${product.imageData}`}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-opacity duration-200 ${
                    imageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  onLoad={() => setImageLoading(false)}
                  onError={() => {
                    setImageLoading(false);
                    setImageError(true);
                  }}
                />
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center">
                  <span className="text-muted-foreground">No Image Available</span>
                </div>
              )}
              {imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-accent">
                  <span className="text-muted-foreground">Failed to load image</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info - from API */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-3xl font-bold text-[#FFD700] mt-2">{product.price.toFixed(2)} EGP</p>

              <div className="flex items-center mt-4 text-sm">
                <div className="flex items-center text-green-500">
                  <Check className="h-4 w-4 mr-1" />
                  <span>In Stock</span>
                </div>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-muted-foreground">{product.stock} available</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 p-0 ${quantity <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent'}`}
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                      }
                    }}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-10 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 p-0 ${quantity >= product.stock ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent'}`}
                    onClick={() => {
                      if (quantity < product.stock) {
                        setQuantity(quantity + 1);
                      }
                    }}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                {quantity >= product.stock && (
                  <span className="ml-2 text-xs text-yellow-500">Max stock reached</span>
                )}
              </div>

              <div className="flex space-x-2">
                <Button
                  size="lg"
                  className="flex-1 bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="flex-1" onClick={handleBuyNow}>
                  Buy Now
                </Button>
              </div>

              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Truck className="h-4 w-4 mr-2 text-[#FFD700]" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2 text-[#FFD700]" />
                <span>Authenticity guaranteed</span>
              </div>
              <div className="flex items-center">
                <Package className="h-4 w-4 mr-2 text-[#FFD700]" />
                <span>Secure packaging for safe delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details - Simplified */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <div className="p-4 border rounded-md bg-background/50 text-muted-foreground text-sm prose">
            <p>{product.description || "No description available."}</p>
          </div>
        </div>
      </div>
    </>
  );
}

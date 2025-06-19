"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ShoppingCart, Star, Plus, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/components/cart/cart-context";
import { CartModal } from "@/components/cart/cart-modal";
import { useAuth } from "@/contexts/auth-context";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { bazaarAPI } from "@/utils/bazaarApi";
import { cartAPI } from "@/utils/cartApi";
import { BazaarItem } from "@/types/bazaar";

export default function BazaarPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState<BazaarItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BazaarItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null); 
  const router = useRouter();
  const { addItem, itemCount } = useCart();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const isAdmin = user?.role === "Admin";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await bazaarAPI.getAllItems();
      setProducts(data as BazaarItem[]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load products. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

   const handleCreateItem = async () => {
    try {
      // We build an object with all the data for our API function
      const itemData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        file: imageFile || undefined, // Convert null to undefined
      };

      // Your bazaarAPI.createItem function must be able to send FormData
      await bazaarAPI.createItem(itemData);
      
      toast({ title: "Success", description: "Item created successfully" });
      setIsCreateDialogOpen(false);
      fetchProducts(); // Refresh the list
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to create item", variant: "destructive" });
    }
  };

  // REPLACE WITH THIS
 const handleEditItem = async () => {
    if (!selectedItem) return;
    try {
      const itemData = {
        itemId: selectedItem.item_id,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        file: imageFile || undefined, // Convert null to undefined
      };

      // Your bazaarAPI.updateItem function must be able to send FormData
      await bazaarAPI.updateItem(itemData);

      toast({ title: "Success", description: "Item updated successfully" });
      setIsEditDialogOpen(false);
      fetchProducts(); // Refresh the list
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to update item", variant: "destructive" });
    }
  };


  const handleDeleteItem = async (itemId: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await bazaarAPI.deleteItem(itemId);
      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete item",
        variant: "destructive",
      });
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = async (product: BazaarItem) => {
    if (!isAuthenticated) {
      toast({ title: "Please Sign In", description: "You need to be signed in to add items to your cart.", variant: "destructive" });
      router.push("/auth/signin");
      return;
    }

    // Check if the item is in stock
    if (product.stock === 0) {
      toast({ title: "Out of Stock", description: "This item is currently out of stock.", variant: "destructive" });
      return;
    }

    try {
      addItem({
        id: product.item_id,
        name: product.name,
        price: product.price,
        image: product.imageData ? `data:image/jpeg;base64,${product.imageData}` : "/placeholder.svg",
        stock: product.stock
      });
      toast({ title: "Added to Cart", description: `"${product.name}" has been added to your cart.` });
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Could not add item to cart.", variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFD700]"></div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 sm:mx-auto sm:p-0 sm:px-20 sm:py-12 sm:mt-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#FFD700] font-poppins">
          Bazaar
        </h1>
        <div className="flex gap-2">
          {isAdmin && (
            <Button
              variant="outline"
              onClick={() => {
                setFormData({ name: "", description: "", price: "", stock: "" });
                setImageFile(null);
                setIsCreateDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            className="relative"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FFD700] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h2 className="text-lg font-medium">All Products</h2>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <Card
              key={product.item_id}
              className="overflow-hidden border-border hover:border-[#FFD700]/50 transition-colors"
            >
              <Link href={`/bazaar/${product.item_id}`}>
                <div className="aspect-square relative bg-accent">
                  <img
                    src={product.imageData ? `data:image/jpeg;base64,${product.imageData}` : "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </Link>
              <CardContent className="p-3">
                <Link href={`/bazaar/${product.item_id}`}>
                  <h3 className="font-medium text-sm line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {product.description || "No description available"}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-[#FFD700] font-semibold">
                      {product.price} EGP
                    </p>
                    <div className="flex items-center">
                      <span className="text-xs text-muted-foreground">
                        Stock: {product.stock}
                      </span>
                    </div>
                  </div>
                </Link>
              </CardContent>
              <CardFooter className="p-3 pt-0 grid grid-cols-2 gap-2">
                {isAdmin ? (
                  <>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setSelectedItem(product);
                        setFormData({
                          name: product.name,
                          description: product.description,
                          price: product.price.toString(),
                          stock: product.stock.toString(),
                        });
                        setImageFile(null);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => handleDeleteItem(product.item_id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full col-span-1"
                      onClick={() => {
                        toast({
                          title: "Product Details",
                          description: `Viewing details for ${product.name}`,
                        });
                        router.push(`/bazaar/${product.item_id}`);
                      }}
                    >
                      Details
                    </Button>
                    <Button
                      className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black col-span-1"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Item</DialogTitle>
            <DialogDescription>
              Add a new item to the bazaar. Fill in all the required
              information.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
              />
            </div> 
                 <div>
            <Label htmlFor="imageFile">Image File</Label>
            <Input
             id="imageFile"
             type="file"
             accept="image/png, image/jpeg, image/gif"
             onChange={(e) => {
             if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
      }
    }}
  />
</div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateItem}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              Update the item information. Fill in all the required fields.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-price">Price</Label>
              <Input
                id="edit-price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-stock">Stock</Label>
              <Input
                id="edit-stock"
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
              />
            </div>
            <div>
               <Label htmlFor="edit-imageFile">New Image File (optional)</Label>
              <Input
                 id="edit-imageFile"
                 type="file"
                accept="image/png, image/jpeg, image/gif"
                  onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                setImageFile(e.target.files[0]);
                }
                }}
                />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditItem}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CartModal open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
}


export interface BazaarItem {
  item_id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string | null;        // ← **Doesn't exist in DB**
  created_at: string;
  updated_at: string;
  imageData: string | null;       // ← **Should be byte**
}
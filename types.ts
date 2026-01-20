export type SockLength = 'Ankle Length' | 'Mid Length' | 'Knee Length';
export type AgeRange = '9 - 12 Years' | '13 - 16 Years' | '17 - 20 Years';
export type WipePack = 'Pack of 10' | 'Pack of 25';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'Socks' | 'Care' | 'Accessories';
  aspect: string;
  hasOptions?: boolean;
  optionImages?: Partial<Record<string, string>>;
}

export interface CartItem extends Product {
  cartId: string; // Unique ID in cart to handle same product with different options
  quantity: number;
  selectedLength?: SockLength;
  selectedAge?: AgeRange;
  selectedColor?: string;
  selectedPack?: WipePack;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}
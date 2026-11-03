export type Category = 'all' | 'panjiri' | 'ghee';

export interface ProductWeightOption {
  label: string;
  multiplier: number; // multiplier of 1kg base price
  unit: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: 'panjiri' | 'ghee';
  pricePerKgOrLitre: number;
  description: string;
  highlights: string[];
  ingredients: string[];
  nutrition: {
    protein: string;
    energy: string;
    goodFats: string;
    shelfLife: string;
  };
  image: string;
  isBestseller?: boolean;
  isSpecial?: boolean;
  weightOptions: ProductWeightOption[];
}

export interface CartItem {
  product: Product;
  selectedWeight: ProductWeightOption;
  quantity: number;
  price: number;
}

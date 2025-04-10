export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface ProductsApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
  currentPage?: number;
  totalPages: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface SingleProductApiResponse {
  product?: Product;
  error?: string;
}

export interface ApiResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export type Rating = {
  rate: number;
  count: number;
};

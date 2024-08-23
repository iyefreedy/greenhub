export type RegisterCredential = {
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
  confirm_password?: string;
};

export type LoginCredential = {
  email: string;
  password: string;
};

export interface User {
  id: number;
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  is_seller: boolean;
  seller?: {
    name: string;
    city: string;
    address: string;
    balance: number;
  };
}

export interface Product {
  id: number;
  name: string;
  image?: string;
  description: string;
  stock: number;
  price: number;
  created_at: string;
  updated_at: string;
}

export type CartProduct = Product & {
  quantity: number;
};

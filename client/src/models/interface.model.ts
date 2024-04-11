export interface Product {
    id: string;
    name: string;
    description: string;
    images: string[];
    default_price: {
      id: string;
      unit_amount: number;
    };
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }
  
  export interface Order {
    orderNumber: number;
    customerEmail: string,
    date: string;
    total: number;
    products: CartItem[];
  }
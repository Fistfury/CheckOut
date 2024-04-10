import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

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

interface CartItem {
  product: Product;
  quantity: number;
}

interface ICartContext {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  clearCart: () => void;
}

const initialValues = {
  cart: [],
  addToCart: () => {},
  clearCart: () => {}
};

const CartContext = createContext<ICartContext>(initialValues);
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: PropsWithChildren) => {
    const {state: authState } = useAuth();
  const [cart, setCart] = useState<CartItem[]>(() => {
    const lsData = localStorage.getItem("cart");
    return lsData ? JSON.parse(lsData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    if (!authState.isAuthenticated) {
        alert("Please log in to add items to the cart.")
        return;
    }
    const clonedCart = [...cart];

    const productAlreadyExists = clonedCart.find(
      (item) => item.product.id === product.id
    );

    if (productAlreadyExists) {
      productAlreadyExists.quantity++;
      setCart(clonedCart);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart")
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

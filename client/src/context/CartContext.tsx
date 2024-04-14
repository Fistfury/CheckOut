import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { CartItem, Product } from "../models/interface.model";
import { useAuth } from "./AuthContext";

interface ICartContext {
  cart: CartItem[];
  addToCart: (products: Product) => void;
  clearCart: () => void;
}

const CartContext = createContext<ICartContext>({ cart: [], addToCart: () => {}, clearCart: () => {} });

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: PropsWithChildren<{}>) => {
  const { state: { isAuthenticated, user } } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (isAuthenticated && user?.stripeId) {
      const storedCart = localStorage.getItem(`cart_${user.stripeId}`);
      if (storedCart) setCart(JSON.parse(storedCart));
    }
  }, [user?.stripeId, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && user?.stripeId) {
      localStorage.setItem(`cart_${user.stripeId}`, JSON.stringify(cart));
    }
  }, [cart, isAuthenticated, user?.stripeId]);

  const addToCart = (product: Product) => {
    const updatedCart = [...cart, { product, quantity: 1 }];
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    if (user?.stripeId) localStorage.removeItem(`cart_${user.stripeId}`);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};






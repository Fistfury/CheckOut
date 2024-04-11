import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import { CartItem, Product } from "../models/interface.model";

interface ICartContext {
  cart: CartItem[];
  addToCart: (products: Product) => void;
  clearCart: () => void;
}

const CartContext = createContext<ICartContext>({ cart: [], addToCart: () => {}, clearCart: () => {} });

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const { state: { isAuthenticated, user }} = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = () => {
      const storedCart = localStorage.getItem(`cart_${user?.stripeId}`);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    };
    if (isAuthenticated && user?.stripeId) {
      loadCart();
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && user?.stripeId) {
      localStorage.setItem(`cart_${user.stripeId}`, JSON.stringify(cart));
    }
  }, [cart, user, isAuthenticated]);

  const addToCart = (product: Product) => {
    if (!isAuthenticated) {
      alert("Please log in to add items to the cart.");
      return;
    }
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
    if (existingItemIndex > -1) {
      const updatedCart = cart.map((item, index) => 
        index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const clearCart = () => {
    setCart([]);
    if (user?.stripeId) {
      localStorage.removeItem(`cart_${user.stripeId}`);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};








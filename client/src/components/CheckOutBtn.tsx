import axios from "axios";
import { useCart } from "../context/CartContext";
import { BsCart2 } from "react-icons/bs";

export const CheckoutButton = () => {
    const { cart, clearCart } = useCart();
  
    const handleDirectCheckout = async () => {
      if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
      }
  
      try {
        const items = cart.map(item => ({
          name: item.product.name,
          image: item.product.images[0],
          unit_amount: item.product.default_price.unit_amount,
          quantity: item.quantity,
        }));
        const customerId = localStorage.getItem("stripeCustomerId");
  
        const response = await axios.post('http://localhost:3000/api/stripe/checkout', {
          items,
          customerId,
        });
  
        window.location.href = response.data.url;
      } catch (error) {
        console.error('Checkout error:', error);
        alert('Failed to initiate checkout.');
      }
    };

  return (
    <button onClick={handleDirectCheckout} className="relative inline-block">
      <BsCart2 className="text-2xl" />
      {cart.length > 0 && (
        <span className="absolute top-3 -right-1 transform -translate-x-1/2 -translate-y-1/2 bg-beard-orange text-beard-cream text-xs font-semibold rounded-full px-1">
          {cart.length}
        </span>
      )}
    </button>
  );
};

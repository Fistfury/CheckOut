import axios from "axios";
import { useCart } from "../context/CartContext"

export const Cart = () => {
    const {cart, clearCart } = useCart();

    const handleCheckout = async () => {
        try {
          const { data } = await axios.post('http://localhost:3000/api/stripe/checkout', {
            items: cart.map(item => ({
              product_id: item.product.id,
              quantity: item.quantity,
            })),
            customerId: localStorage.getItem('stripeCustomerId'),
          });
          window.location.href = data.url; 
        } catch (error) {
          console.error('Checkout error:', error);
          alert('Failed to initiate checkout.');
        }
      };


return (
    <>
    <h2>Your Cart</h2>
    {cart.length > 0 ? (
        <ul>
            {cart.map(item => (
                <li key={item.product.id}>
                    {item.product.name} - {item.quantity} x {item.product.default_price.unit_amount / 100} SEK
                </li>
            ))}
        </ul>
    ) : (
        <p>Your cart is empty.</p>
    )}
    <button onClick={handleCheckout}>Checkout</button>
    <button onClick={clearCart}>Clear Cart</button>
</>
);
};
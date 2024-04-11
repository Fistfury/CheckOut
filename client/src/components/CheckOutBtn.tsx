import axios from "axios";
import { useCart } from "../context/CartContext";
import { BsCart2 } from "react-icons/bs";
import { useState } from "react";
import { PostNordModal } from "./PostNordModal";

interface ServicePoint {
  servicePointId: string;
  name: string;
  visitingAddress: string;
}

export const CheckoutButton = () => {
  const { cart } = useCart();
  const [showPostNordModal, setShowPostNordModal] = useState(false);
  const [selectedServicePoint, setSelectedServicePoint] =
    useState<ServicePoint | null>(null);

  const proceedToCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    if (!selectedServicePoint) {
      alert("Please select a pickup location first.");
      return;
    }
    try {
      const items = cart.map((item) => ({
        price: item.product.default_price.id,
        name: item.product.name,
        image: item.product.images[0],
        unit_amount: item.product.default_price.unit_amount,
        quantity: item.quantity,
      }));
      const customerId = localStorage.getItem("stripeCustomerId");
      if (!customerId) {
        alert("No customer ID found. Please log in again.");
        return;
      }
      console.log(customerId);

      const response = await axios.post(
        "http://localhost:3000/api/stripe/checkout",
        {
          items,
          customerId,
          pickupLocation: selectedServicePoint.visitingAddress,
        }
      );

      localStorage.setItem("stripeSessionId", response.data.sessionId);
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to initiate checkout.");
    }
  };
  const handlePickupLocationSelected = (location: ServicePoint) => {
    setSelectedServicePoint(location); 
    setShowPostNordModal(false); 
    proceedToCheckout(); 
  };

  const handleDirectCheckout = () => {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    setShowPostNordModal(true);  
};

  return (
    <>
      <button onClick={handleDirectCheckout} className="relative inline-block">
        <BsCart2 className="text-2xl" />
        {cart.length > 0 && (
          <span className="absolute top-3 -right-1 transform -translate-x-1/2 -translate-y-1/2 bg-beard-orange text-beard-cream text-xs font-semibold rounded-full px-1">
            {cart.length}
          </span>
        )}
      </button>
      {showPostNordModal && (
        <PostNordModal
          isOpen={showPostNordModal}
          onClose={() => setShowPostNordModal(false)}
          onPickupLocationSelected={handlePickupLocationSelected}
        />
      )}
    </>
  );
};

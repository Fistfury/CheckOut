import axios from "axios";
import { useCart } from "../context/CartContext";
import { BsCart2 } from "react-icons/bs";
import { useEffect, useState } from "react";
import { PostNordModal } from "./PostNordModal";
import { useNavigate } from "react-router-dom";

interface ServicePoint {
  servicePointId: string;
  name: string;
  
}

export const CheckoutButton = () => {
  const { cart } = useCart();
  const [showPostNordModal, setShowPostNordModal] = useState(false);
  const [selectedServicePoint, setSelectedServicePoint] =
    useState<ServicePoint | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
      if (selectedServicePoint) {
        proceedToCheckout();
      }
    }, [selectedServicePoint]);

  const proceedToCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    if (!selectedServicePoint) {
      alert("Please select a pickup location first.");
      return;
    }
    const { data } = await axios.get("http://localhost:3000/api/users/customer-info");
    const customerId = data.stripeId;
    if (!customerId) {
      alert("No customer ID found. Please log in again.");
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
   
      console.log(customerId);

      const response = await axios.post(
        "http://localhost:3000/api/stripe/checkout",
        {
          items,
          customerId,
          pickupLocation: selectedServicePoint.name,
        }
      );
        console.log(selectedServicePoint.name)
      localStorage.setItem("stripeSessionId", response.data.sessionId);
      // navigate('/checkout-success');
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to initiate checkout.");
    }
  };
  const handlePickupLocationSelected = (ServicePoint: ServicePoint) => {
    setSelectedServicePoint(ServicePoint);
    setShowPostNordModal(false);
    
  };

  const handleDirectCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    setShowPostNordModal(true);
  };
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <button onClick={handleDirectCheckout} className="relative inline-block">
        <BsCart2 className="text-2xl hover:text-beard-orange" />
        {totalItems > 0 && (
          <span className="absolute top-3 -right-1 transform -translate-x-1/2 -translate-y-1/2 bg-beard-orange text-beard-cream text-xs font-semibold rounded-full px-1">
            {totalItems}
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

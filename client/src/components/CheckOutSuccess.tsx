import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { BiCheck } from "react-icons/bi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const apiUrl = import.meta.env.VITE_SESSION_KEY;

export const CheckoutSuccess = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sessionId = params.get("session_id");
  const { clearCart } = useCart();
  const { dispatch, state } = useAuth();

  const handleCheckoutSuccess = async () => {
    if (!sessionId) {
      console.log("Session ID is missing.");
      return;
    }
    try {
      const response = await axios.post(
        `${apiUrl}/api/stripe/verify`,
        {
          sessionId,
        }
      );

      if (response.data.verified) {
        console.log("Payment verification successful");
        const newStripeId = localStorage.getItem('stripeId');
        console.log("Stored Stripe ID:", newStripeId);
        clearCart();
        dispatch({ type: "SET_VERIFIED", verified: true });
      } else {
        console.log("Payment verification failed");
        dispatch({ type: "SET_VERIFIED", verified: false });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      dispatch({ type: "SET_VERIFIED", verified: false });
    }
  };

  useEffect(() => {
    handleCheckoutSuccess();
  }, [sessionId]);
  return (
    <div className="text-center">
      {state.isVerified ? (
        <>
          <BiCheck className="mx-auto h-12 w-12 text-green-500" />
          <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
            Payment Successful!
          </h1>
          <p className="mt-2 text-lg">Thank you for your purchase.</p>
        </>
      ) : (
        <p className="mt-2 text-lg">Verifying payment, please wait...</p>
      )}
       <Link
        to="/"
        className="mt-4 inline-block bg-beard-dark text-beard-cream px-6 py-2 rounded hover:bg-beard-deep-brown transition duration-300"
      >
        Return to Homepage
      </Link>
    </div>
  );
};

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BiCheck } from "react-icons/bi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

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
        "http://localhost:3000/api/stripe/verify",
        {
          sessionId,
        }
      );

      if (response.data.verified) {
        console.log("Payment verification successful");
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
    </div>
  );
};

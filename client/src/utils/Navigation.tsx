import {  useState } from "react";
import { Modal } from "../components/Modal";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import {  useAuth } from "../context/AuthContext";
import { CheckoutButton } from "../components/CheckOutBtn";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { AiOutlineDelete } from "react-icons/ai";

export const Navigation = () => {
  const { state, dispatch } = useAuth();
  const { cart, clearCart } = useCart();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  
const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("stripeCustomerId");
    localStorage.removeItem("userEmail");
    dispatch({ type: "LOGOUT" });
    navigate("/");
    
  };
  const handleProfileClick = () => {
    navigate("/profile");
  };
  const handleClearCart = () => {
    clearCart();
  }

  return (
    <nav className="bg-beard-brown text-beard-cream p-2 flex justify-end items-center text-sm">
      {state.isAuthenticated ? (
        <div className="flex items-center space-x-2">
          <button onClick={handleProfileClick}>
            <FiUser className="text-xl hover:text-beard-orange" />
          </button>
          <CheckoutButton />
          {cart.length > 0 && ( 
            <button onClick={handleClearCart} title="Clear cart" className="text-beard-cream hover:text-beard-orange">
              <AiOutlineDelete className="text-xl" />
            </button>
          )}
          <button className="hover:text-beard-orange" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <button
            onClick={() => setShowLoginModal(true)}
            className="mr-6 hover:text-beard-orange"
          >
            Login
          </button>
          <button
            onClick={() => setShowRegisterModal(true)}
            className="hover:text-beard-orange"
          >
            Register
          </button>
        </>
      )}
      <Modal show={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <LoginForm onSuccess={() => setShowLoginModal(false)} />
      </Modal>
      <Modal
        show={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      >
        <RegisterForm onSuccess={() => setShowRegisterModal(false)} />
      </Modal>
    </nav>
  );
};

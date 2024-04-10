import {  useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../components/Modal";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import {  useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { BsCart2 } from "react-icons/bs";
import { CheckoutButton } from "../components/CheckOutBtn";

export const Navigation = () => {
  const { state, dispatch } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const { cart } = useCart();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    
  };

  return (
    <nav className="bg-beard-brown text-beard-cream p-2 flex justify-end items-center text-sm">
      {state.isAuthenticated ? (
        <div className="flex items-center space-x-2">
          <CheckoutButton />
          {/* <div className="relative inline-block">
            <Link to="/cart">
              <BsCart2 className="text-2xl" />
              {
                <span className="absolute top-3 -right-1 transform -translate-x-1/2 -translate-y-1/2 bg-beard-orange text-beard-cream text-xs font-semibold rounded-full px-1">
                  {cart.length}
                </span>
              }
            </Link>
          </div> */}
          <button onClick={handleLogout}>Logout</button>
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

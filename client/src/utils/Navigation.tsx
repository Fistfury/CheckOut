import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { FaShoppingCart } from "react-icons/fa";

export const Navigation = () => {
  const { state, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const cartCount = 3;
  return (
    <nav className="bg-beard-green text-beard-cream p-2 flex justify-end items-center text-sm">
      {state.isAuthenticated ? (
        <div className="flex items-center space-x-2">
          <div className="relative inline-block">
            <Link to="/cart">
              <FaShoppingCart className="text-2xl" />
              {cartCount > 0 && (
                <span className="absolute top-3 -right-1 transform -translate-x-1/2 -translate-y-1/2 bg-beard-orange text-beard-cream text-xs font-semibold rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <Link to="/login" className="mr-6">
            Login
          </Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

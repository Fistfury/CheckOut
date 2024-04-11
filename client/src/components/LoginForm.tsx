import { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IconicBtn } from "./IconicBtn";
import { useAuth } from "../context/AuthContext";

interface LoginFormProps {
  onSuccess: () => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { dispatch } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );
      if (response.data.stripeId) {
        localStorage.setItem("stripeCustomerId", response.data.stripeId);
        localStorage.setItem("userEmail", email);
        dispatch({
          type: "LOGIN",
          payload: { email, stripeId: response.data.stripeId },
        });
        onSuccess();
        navigate("/");
      } else {
        throw new Error("Stripe Customer ID not found");
      }
    } catch (error) {
      setMessage("Wrong password or email");
    }
  };

  return (
    <>
      <div className="w-full px-4 sm:max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center my-4 text-beard-dark">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full p-3 mb-4 border border-beard-grey rounded focus:outline-none focus:ring-2 focus:ring-beard-dark focus:border-transparent"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="w-full p-3 mb-4 border border-beard-grey rounded focus:outline-none focus:ring-2 focus:ring-beard-dark focus:border-transparent"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <IconicBtn />
          {message && <p className="text-red-500">{message}</p>}
        </form>
      </div>
    </>
  );
};

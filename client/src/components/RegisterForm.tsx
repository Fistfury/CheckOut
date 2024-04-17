import { useState, FormEvent } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IconicBtn } from "./IconicBtn";

const apiUrl = import.meta.env.VITE_SESSION_KEY;

interface RegisterFormProps {
  onSuccess: () => void;
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/register`,
        {
          email,
          password,
        }
      );
      if (response.status === 201) {
        dispatch({
          type: "LOGIN",
          payload: { email, stripeId: response.data.stripeId },
        });
        onSuccess();
        navigate("/");
        setMessage("Registration successful!");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data.error || "An unexpected error occurred"
        );
      } else {
        console.error("Stripe ID not found in the response");
        setMessage("Registration failed: No Stripe ID provided.");
      }
    }
  };

  return (
    <>
      <div className="w-full px-4 sm:max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center my-4 text-beard-dark">
          Register
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

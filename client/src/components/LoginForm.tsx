import { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IconicBtn } from "./IconicBtn";
import { useAuth } from "../context/AuthContext";

const apiUrl = import.meta.env.VITE_SESSION_KEY;

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
        `${apiUrl}/api/auth/login`,
        {
          email,
          password,
        
        }
      );
    
      if (response.status === 200) {
        localStorage.setItem('stripeId', response.data.stripeId);
       
        dispatch({
          type: "LOGIN",
          payload: { email, stripeId: response.data.stripeId },
        });
        onSuccess();
        navigate("/");
      } else {
        throw new Error("Failed to log in");
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
            autoComplete="current-email"
          />
          <input
            className="w-full p-3 mb-4 border border-beard-grey rounded focus:outline-none focus:ring-2 focus:ring-beard-dark focus:border-transparent"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            autoComplete="current-password" 
          />
          <IconicBtn />
          {message && <p className="text-red-500">{message}</p>}
        </form>
      </div>
    </>
  );
};

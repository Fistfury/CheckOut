import { useState, FormEvent, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IconicBtn } from "./IconicBtn";

interface RegisterFormProps {
  onSuccess: () => void;
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("");
  }

  const { dispatch } = context;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        email,
        password,
      });
      dispatch({ type: "LOGIN", payload: { email } });
      onSuccess();
      navigate("/");
      setMessage("Registration successful!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data.error || "An unexpected error occurred"
        );
      } else {
        setMessage("An unexpected error occurred");
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

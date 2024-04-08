import { useState, FormEvent, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Navigation } from "../utils/Navigation";

export const RegisterForm = () => {
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
      <form onSubmit={handleSubmit}>
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-beard-dark focus:border-transparent"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-beard-dark focus:border-transparent"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button
          className="w-full p-3 bg-beard-dark text-white rounded hover:bg-beard-darkest"
          type="submit"
        >
          Register
        </button>
        {message && <p>{message}</p>}
      </form>
      </div>
    </>
  );
};

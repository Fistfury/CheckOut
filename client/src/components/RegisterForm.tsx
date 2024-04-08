import { useState, FormEvent, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("")
  }

  const { dispatch } = context;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/users/register", {
        email,
        password,
      });
      dispatch({ type: 'LOGIN', payload: { email } });
            navigate('/');
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
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

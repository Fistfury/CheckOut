import { useState, FormEvent, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Navigation } from "../utils/Navigation";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const { dispatch } = context;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
      dispatch({ type: "LOGIN", payload:{ email } });
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data.error ||  "Wrong password or email"
        );
      } else {
        setMessage("Wrong password or email");
      }
    }
  };

  return (
    <>
      <h2>Login</h2>
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
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
    </>
  );
};

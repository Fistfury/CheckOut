import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginForm } from "./components/LoginForm";

import { AuthProvider } from "./context/authContext";
import { Header } from "./components/Header";

import { Footer } from "./components/Footer";
import { RegisterPage } from "./pages/RegisterPage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <main className="flex-grow bg-black">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;

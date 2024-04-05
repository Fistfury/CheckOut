import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';


const App = () => {
    return (
      <Router>
      <div>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              
          </Routes>
      </div>
  </Router>
    );
};

export default App;
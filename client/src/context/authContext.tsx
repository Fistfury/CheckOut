import axios from "axios";
import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";

const apiUrl = import.meta.env.VITE_SESSION_KEY;


interface User {
  email: string;
  stripeId?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isVerified: boolean;
}

type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "SET_VERIFIED"; verified: boolean };

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isVerified: false,
};



const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    case "SET_VERIFIED":
      return { ...state, isVerified: action.verified };
    default:
      throw new Error("Unhandled action type");
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
  
  
    const validateSession = async () => {
     
      try {
        const response = await axios.get(`${apiUrl}/api/validate/validate-session`);
        if (response.data.isAuthenticated) {
          const storedStripeId = localStorage.getItem('stripeId');
          dispatch({ type: 'LOGIN', payload: {...response.data.user, stripeId: storedStripeId }});
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } catch (error) {
        console.error('Session validation failed:', error);
        dispatch({ type: 'LOGOUT' });
      }
    };
  
    validateSession();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

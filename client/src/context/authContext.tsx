import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";

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
    const storedCustomerId = localStorage.getItem("stripeCustomerId");
    const storedEmail = localStorage.getItem("userEmail");

    if (storedCustomerId && storedEmail) {
      const user = { email: storedEmail, stripeId: storedCustomerId };
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

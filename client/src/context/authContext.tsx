import { createContext, useReducer, useContext, ReactNode } from "react";

interface User {
  email: string;
  stripeId?: string; 
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" };

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
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
    default:
      throw new Error("Unhandled action type");
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
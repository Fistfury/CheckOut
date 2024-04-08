import { createContext, useReducer, Dispatch, ReactNode } from "react";

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string } | null;
}

type AuthAction =
  | { type: "LOGIN"; payload: { email: string } }
  | { type: "LOGOUT" };

interface AuthContextType {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const AuthContext = createContext<AuthContextType>({
  state: initialState,
  dispatch: () => {},
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: { email: action.payload.email },
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
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

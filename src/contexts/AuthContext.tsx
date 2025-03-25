// ThemeContext.tsx
import React, { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  authorized: boolean;
  handleSetAuthorization: (value: boolean) => void;
}

// Define a context for theme
const AuthContext = createContext<AuthContextType>({
  authorized: false,
  handleSetAuthorization: () => {},
});

// Create a provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authorized, setAuthorized] = useState<boolean>(false);

  const handleSetAuthorization = (value: boolean) => {
    setAuthorized(value);
    console.log("User logged in:", value);
  };

  return (
    <AuthContext.Provider value={{ authorized, handleSetAuthorization }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

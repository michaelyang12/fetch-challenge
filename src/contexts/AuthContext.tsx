// ThemeContext.tsx
import React, { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  authorized: boolean;
  handleAuthorization: (value: boolean) => void;
}
// Define a context for theme
const AuthContext = createContext<AuthContextType>({
  authorized: false,
  handleAuthorization: () => {},
});

// Create a provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authorized, setAuthorized] = useState<boolean>(true);

  const handleAuthorization = (value: boolean) => {
    setAuthorized(value);
    console.log("User logged in:", value);
  };

  return (
    <AuthContext.Provider value={{ authorized, handleAuthorization }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

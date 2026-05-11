import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminContextType {
  username: string;
  setUsername: (username: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  // Initialize state from sessionStorage to persist across page refreshes
  const [username, setUsernameState] = useState<string>(() => {
    return sessionStorage.getItem("admin_username") || "";
  });

  const setUsername = (newUsername: string) => {
    setUsernameState(newUsername);
    if (newUsername) {
      sessionStorage.setItem("admin_username", newUsername);
    } else {
      sessionStorage.removeItem("admin_username");
    }
  };

  return <AdminContext.Provider value={{ username, setUsername }}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within an AdminProvider");
  return context;
}
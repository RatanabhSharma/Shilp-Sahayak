import React, { useEffect, useState, createContext, useContext } from 'react';
type User = {
  id: string;
  name: string;
  email: string;
  address?: string;
};
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  const login = async (email: string, password: string) => {
    // Mock login - in a real app, this would call an API
    const mockUser = {
      id: '123',
      name: 'Demo User',
      email,
      address: 'Sample Address, City, India'
    };
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };
  const register = async (name: string, email: string, password: string) => {
    // Mock registration - in a real app, this would call an API
    const mockUser = {
      id: '123',
      name,
      email
    };
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = {
        ...user,
        ...data
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
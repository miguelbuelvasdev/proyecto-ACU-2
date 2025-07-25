import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Exporta el contexto creado directamente
export const AuthContext = createContext();

// Crea el proveedor del contexto
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const register = async (formData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulación de registro exitoso
        const user = { 
          id: '123', 
          name: formData.name, 
          email: formData.email,
          token: 'fake-jwt-token' 
        };
        localStorage.setItem('authToken', user.token);
        setUser(user);
        navigate('/dashboard');
        resolve(user);
      }, 1500);
    });
  };

  const login = async (credentials) => {
    // Implementación similar para login
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      register,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Exporta un custom hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

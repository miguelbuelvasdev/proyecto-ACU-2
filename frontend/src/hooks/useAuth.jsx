import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Asegúrate de importar AuthContext

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context; // Devuelve el contexto completo
};

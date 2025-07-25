import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, LogIn, Leaf } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Simulación de llamada a API
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Aquí iría la lógica real de autenticación
        console.log('Login data:', formData);
        
        // Redirigir al dashboard después del login exitoso
        navigate('/dashboard');
      } catch (error) {
        setErrors({ general: 'Error al iniciar sesión. Por favor intente nuevamente.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-dark flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-accent-purple/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-gold/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-effect rounded-3xl p-8 sm:p-10"
        >
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-4 bg-gradient-gold rounded-full flex items-center justify-center"
            >
              <Leaf className="w-10 h-10 text-neutral-dark" />
            </motion.div>
            <h2 className="text-3xl font-bold gradient-text-gold mb-2">Bienvenido de vuelta</h2>
            <p className="text-neutral-light/70">Inicia sesión en tu cuenta EcoAceite</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-light mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-light/50" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-neutral-light/10 border ${
                    errors.email ? 'border-red-500' : 'border-neutral-light/20'
                  } rounded-xl text-neutral-light placeholder-neutral-light/50 focus:border-primary-gold focus:outline-none transition-colors`}
                  placeholder="tu@email.com"
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-500"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-light mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-light/50" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 bg-neutral-light/10 border ${
                    errors.password ? 'border-red-500' : 'border-neutral-light/20'
                  } rounded-xl text-neutral-light placeholder-neutral-light/50 focus:border-primary-gold focus:outline-none transition-colors`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-light/50 hover:text-neutral-light transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-500"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-neutral-light/10 border-neutral-light/20 rounded text-primary-gold focus:ring-primary-gold"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-light">
                  Recuérdame
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-primary-gold hover:text-primary-gold/80 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Error message */}
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-sm text-red-500"
              >
                {errors.general}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-futuristic flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-neutral-dark border-t-transparent rounded-full"
                  />
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Iniciar Sesión</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Alternative login options */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-light/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-transparent text-neutral-light/50">O continúa con</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-neutral-light/20 hover:bg-neutral-light/10 transition-colors"
              >
                <img src="https://placehold.co/20x20" alt="Logo de Google con fondo blanco y letra G multicolor" />
                <span className="text-neutral-light">Google</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-neutral-light/20 hover:bg-neutral-light/10 transition-colors"
              >
                <img src="https://placehold.co/20x20" alt="Logo de Microsoft con cuatro cuadrados de colores azul, rojo, verde y amarillo" />
                <span className="text-neutral-light">Microsoft</span>
              </motion.button>
            </div>
          </div>

          {/* Sign up link */}
             <p className="mt-8 text-center text-sm text-neutral-light/70">
                ¿No tienes una cuenta?{' '}
                <Link to="/register" className="text-primary-gold hover:text-primary-gold/80 transition-colors font-medium">
                  Regístrate aquí
                </Link>
              </p>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-neutral-light/40">
            Al iniciar sesión, aceptas nuestros{' '}
            <Link to="/terms" className="text-primary-gold/60 hover:text-primary-gold transition-colors">
              Términos de Servicio
            </Link>{' '}
            y{' '}
            <Link to="/privacy" className="text-primary-gold/60 hover:text-primary-gold transition-colors">
              Política de Privacidad
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;


import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn, Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Importar Axios para las peticiones HTTP

const Login = () => {
  // Estados del componente
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // URL base de la API (debería venir de las variables de entorno)
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar errores cuando el usuario escribe
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Valida el formulario antes de enviarlo
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Maneja el envío del formulario de login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const endpoint = `${API_BASE_URL}/auth/login`;
      const payload = {
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post(endpoint, payload, config);

      // Guarda el access_token y el user_id en localStorage
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("user_id", response.data.user_id);

      // Redirigir al dashboard
      navigate("/dashboard");
    } catch (error) {
      // ...manejo de errores...
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-white sm:px-6 lg:px-8">
      {/* Efectos de fondo futuristas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-[#FFD439]/10 to-[#F4A300]/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-l from-[#256B3E]/10 to-[#FCD94B]/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Contenedor del formulario */}
      <div className="z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 bg-white border border-gray-200 shadow-xl rounded-3xl sm:p-10"
        >
          {/* Logo y título */}
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-[#FFD439] to-[#F4A300] rounded-full flex items-center justify-center"
            >
              <Leaf className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-[#256B3E] mb-2">
              Inicio de Sesión
            </h2>
            <p className="text-gray-600">Accede a tu cuenta EcoAceite</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#F4A300] focus:border-[#F4A300] outline-none transition-all`}
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

            {/* Campo de contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 bg-gray-50 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#F4A300] focus:border-[#F4A300] outline-none transition-all`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
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

            {/* Opciones adicionales */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-gray-50 border-gray-300 rounded text-[#F4A300] focus:ring-[#F4A300]"
                />
                <label
                  htmlFor="remember-me"
                  className="block ml-2 text-sm text-gray-700"
                >
                  Recuérdame
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-[#F4A300] hover:text-[#FFD439]"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Mensaje de error general */}
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 text-sm text-red-700 bg-red-100 border border-red-200 rounded-xl"
              >
                {errors.general}
              </motion.div>
            )}

            {/* Botón de submit */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#FFD439] to-[#F4A300] text-[#256B3E] rounded-xl font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-[#256B3E] border-t-transparent rounded-full"
                  />
                  <span className="ml-2">Iniciando sesión...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <LogIn className="w-5 h-5" />
                  <span>Iniciar Sesión</span>
                </div>
              )}
            </motion.button>
          </form>

          {/* Enlace para registrarse */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/register"
                className="text-[#F4A300] hover:text-[#FFD439] font-medium"
              >
                Regístrate ahora
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

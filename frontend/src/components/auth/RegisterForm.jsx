import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Store,
  ArrowRight,
  ArrowLeft,
  Check,
  AlertCircle,
  ChefHat,
  Users,
  Calendar,
  Eye,
  EyeOff,
  Leaf,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //Dependencias
  const navigate = useNavigate();

  // Form data state
  const [formData, setFormData] = useState({
    restaurantName: "",
    restaurantType: "",
    capacity: "",
    foundedYear: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    subscribeNewsletter: false,
    oilUsageEstimate: "10",
    wasteScheduleMonday: "10:00",
    wasteScheduleThursday: "14:00",
    restaurantCategory: "",
  });

  const restaurantTypes = [
    "Restaurante Tradicional",
    "Comida Rápida",
    "Cafetería",
    "Food Truck",
    "Catering",
    "Hotel Restaurant",
    "Bar & Grill",
    "Otro",
  ];

  const restaurantTypeMap = {
    "Restaurante Tradicional": "restaurant",
    "Comida Rápida": "fast_food",
    Cafetería: "cafeteria",
    "Food Truck": "food_truck",
    Catering: "catering",
    "Hotel Restaurant": "hotel_restaurant",
    "Bar & Grill": "bar_grill",
    Otro: "other",
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.restaurantName)
          newErrors.restaurantName = "El nombre del restaurante es requerido";
        if (!formData.restaurantType)
          newErrors.restaurantType = "Selecciona un tipo de restaurante";
        if (!formData.capacity)
          newErrors.capacity = "La capacidad es requerida";
        if (!formData.foundedYear)
          newErrors.foundedYear = "El año de fundación es requerido";
        break;

      case 2:
        if (!formData.ownerName)
          newErrors.ownerName = "El nombre del propietario es requerido";
        if (!formData.email) newErrors.email = "El email es requerido";
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
          newErrors.email = "Email inválido";
        if (!formData.phone) newErrors.phone = "El teléfono es requerido";
        if (!formData.address) newErrors.address = "La dirección es requerida";
        if (!formData.city) newErrors.city = "La ciudad es requerida";
        break;

      case 3:
        if (!formData.password)
          newErrors.password = "La contraseña es requerida";
        if (formData.password && formData.password.length < 8)
          newErrors.password = "La contraseña debe tener al menos 8 caracteres";
        if (formData.password !== formData.confirmPassword)
          newErrors.confirmPassword = "Las contraseñas no coinciden";
        if (!formData.acceptTerms)
          newErrors.acceptTerms = "Debes aceptar los términos y condiciones";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(3)) return;

    setIsLoading(true);

    try {
      const API_BASE_URL =
        import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

      // Construye el payload para el registro
      const payload = {
        user: {
          name: formData.ownerName,
          email: formData.email,
          password_hash: formData.password,
          role: "restaurant_owner",
          restaurant_name: formData.restaurantName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          verified: true,
        },
        restaurant: {
          capacity: Number(formData.capacity),
          founding_year: Number(formData.foundedYear),
          oil_usage_estimate: Number(formData.oilUsageEstimate),
          waste_schedule: {
            monday: formData.wasteScheduleMonday,
            friday: formData.wasteScheduleThursday,
          },
          category: formData.restaurantType || "restaurant",
          certification_status: "pending",
        },
      };

      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        payload
      );

      // Guarda access_token y user_id en localStorage
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("user_id", response.data.user.id);

      alert("¡Registro exitoso! Bienvenido a EcoAceite");
      navigate("/home");
    } catch (error) {
      setErrors({
        submit: `Error al registrar. Por favor intenta de nuevo.\n ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-[#256B3E] mb-6">
              Información del Restaurante
            </h3>

            <div>
              <label className="block text-sm font-medium text-[#256B3E]/80 mb-2">
                Nombre del Restaurante
              </label>
              <div className="relative">
                <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#F4A300]/60" />
                <input
                  type="text"
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#F4A300] focus:ring-2 focus:ring-[#F4A300]/20 transition-all duration-300 text-[#256B3E]"
                  placeholder="Ej: La Cocina de María"
                />
              </div>
              {errors.restaurantName && (
                <p className="flex items-center mt-1 text-sm text-red-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.restaurantName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#256B3E]/80 mb-2">
                Tipo de Restaurante
              </label>
              <div className="relative">
                <ChefHat className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#F4A300]/60" />
                <select
                  name="restaurantType"
                  value={formData.restaurantType}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#F4A300] focus:ring-2 focus:ring-[#F4A300]/20 transition-all duration-300 text-[#256B3E] appearance-none"
                >
                  <option value="">Selecciona un tipo</option>
                  {restaurantTypes.map((type) => (
                    <option key={type} value={restaurantTypeMap[type]}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              {errors.restaurantType && (
                <p className="flex items-center mt-1 text-sm text-red-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.restaurantType}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#256B3E]/80 mb-2">
                  Capacidad
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#F4A300]/60" />
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#F4A300] focus:ring-2 focus:ring-[#F4A300]/20 transition-all duration-300 text-[#256B3E]"
                    placeholder="Ej: 50"
                    min="1"
                  />
                </div>
                {errors.capacity && (
                  <p className="flex items-center mt-1 text-sm text-red-500">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.capacity}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#256B3E]/80 mb-2">
                  Año de Fundación
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#F4A300]/60" />
                  <input
                    type="number"
                    name="foundedYear"
                    value={formData.foundedYear}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#F4A300] focus:ring-2 focus:ring-[#F4A300]/20 transition-all duration-300 text-[#256B3E]"
                    placeholder={new Date().getFullYear()}
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
                {errors.foundedYear && (
                  <p className="flex items-center mt-1 text-sm text-red-500">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.foundedYear}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-[#256B3E] mb-6">
              Información de Contacto
            </h3>

            <div>
              <label className="block text-sm font-medium text-[#256B3E]/80 mb-2">
                Nombre
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#F4A300]/60" />
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#F4A300] focus:ring-2 focus:ring-[#F4A300]/20 transition-all duration-300 text-[#256B3E]"
                  placeholder="Nombre completo"
                />
              </div>
              {errors.ownerName && (
                <p className="flex items-center mt-1 text-sm text-red-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.ownerName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#256B3E]/80 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#F4A300]/60" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#F4A300] focus:ring-2 focus:ring-[#F4A300]/20 transition-all duration-300 text-[#256B3E]"
                  placeholder="correo@ejemplo.com"
                />
              </div>
              {errors.email && (
                <p className="flex items-center mt-1 text-sm text-red-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#256B3E]/80 mb-2">
                Teléfono
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#F4A300]/60" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#F4A300] focus:ring-2 focus:ring-[#F4A300]/20 transition-all duration-300 text-[#256B3E]"
                  placeholder="+57 300 123 4567"
                />
              </div>
              {errors.phone && (
                <p className="flex items-center mt-1 text-sm text-red-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#256B3E]/80 mb-2">
                Dirección
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#F4A300]/60" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#F4A300] focus:ring-2 focus:ring-[#F4A300]/20 transition-all duration-300 text-[#256B3E]"
                  placeholder="Calle Principal #123"
                />
              </div>
              {errors.address && (
                <p className="flex items-center mt-1 text-sm text-red-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.address}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#256B3E]/80 mb-2">
                Ciudad
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#F4A300]/60" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#F4A300] focus:ring-2 focus:ring-[#F4A300]/20 transition-all duration-300 text-[#256B3E]"
                  placeholder="Barranquilla, Atlántico"
                />
              </div>
              {errors.city && (
                <p className="flex items-center mt-1 text-sm text-red-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.city}
                </p>
              )}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-[#256B3E] mb-6">
              Configuración de Cuenta
            </h3>

            <div>
              <label className="block text-sm font-medium text-[#256B3E]/80 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#F4A300]/60" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#F4A300] focus:ring-2 focus:ring-[#F4A300]/20 transition-all duration-300 text-[#256B3E]"
                  placeholder="Mínimo 8 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#256B3E]/60 hover:text-[#F4A300] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="flex items-center mt-1 text-sm text-red-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#256B3E]/80 mb-2">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#F4A300]/60" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-[#F4A300] focus:ring-2 focus:ring-[#F4A300]/20 transition-all duration-300 text-[#256B3E]"
                  placeholder="Repetir contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#256B3E]/60 hover:text-[#F4A300] transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="flex items-center mt-1 text-sm text-red-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="mt-6 space-y-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="w-5 h-5 mt-0.5 rounded border-2 border-[#F4A300] bg-white checked:bg-[#F4A300] focus:ring-2 focus:ring-[#F4A300]/20 text-white"
                />
                <span className="text-sm text-[#256B3E]/80 leading-relaxed">
                  Acepto los{" "}
                  <a
                    href="#"
                    className="text-[#F4A300] hover:text-[#FFD439] underline"
                  >
                    términos y condiciones
                  </a>{" "}
                  y la{" "}
                  <a
                    href="#"
                    className="text-[#F4A300] hover:text-[#FFD439] underline"
                  >
                    política de privacidad
                  </a>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="flex items-center text-sm text-red-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.acceptTerms}
                </p>
              )}

              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onChange={handleInputChange}
                  className="w-5 h-5 mt-0.5 rounded border-2 border-[#F4A300] bg-white checked:bg-[#F4A300] focus:ring-2 focus:ring-[#F4A300]/20 text-white"
                />
                <span className="text-sm text-[#256B3E]/80 leading-relaxed">
                  Quiero recibir tips de sostenibilidad y novedades del sector
                  gastronómico
                </span>
              </label>
            </div>
          </motion.div>
        );
    }
  };

  const steps = [
    { number: 1, title: "Restaurante", description: "Información básica" },
    { number: 2, title: "Contacto", description: "Datos de contacto" },
    { number: 3, title: "Cuenta", description: "Configuración final" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[#FFD439]/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#256B3E]/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-4xl">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center justify-center mb-8 space-x-3 lg:justify-start">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FFD439] to-[#F4A300] rounded-2xl shadow-lg flex items-center justify-center">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#256B3E]">EcoAceite</h1>
                <p className="text-sm text-[#256B3E]/70 font-medium tracking-wider">
                  OVA EDUCATIVO
                </p>
              </div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-[#256B3E] leading-tight">
              Únete a la <span className="text-[#F4A300]">Revolución</span>
              <br />
              del ACU Sostenible
            </h2>

            <p className="text-lg text-[#256B3E]/80 mb-8 leading-relaxed">
              Capacita a tu equipo en el manejo responsable del Aceite de Cocina
              Usado y contribuye a un futuro más sostenible.
            </p>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                "Certificación oficial reconocida",
                "Contenido multimedia interactivo",
                "Protocolos de seguridad actualizados",
                "Soporte técnico especializado",
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 bg-[#F4A300] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[#256B3E]/80">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-8 bg-white border border-gray-200 shadow-2xl rounded-3xl"
          >
            {/* Progress Steps */}
            <div className="flex justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      currentStep >= step.number
                        ? "bg-[#F4A300] text-white shadow-lg"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-1 mx-2 transition-all duration-300 ${
                        currentStep > step.number
                          ? "bg-[#F4A300]"
                          : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {/* Current Step Info */}
            <div className="mb-8 text-center">
              <h3 className="text-lg font-semibold text-[#256B3E]">
                {steps[currentStep - 1].title}
              </h3>
              <p className="text-sm text-[#256B3E]/60">
                {steps[currentStep - 1].description}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                  <motion.button
                    type="button"
                    onClick={handlePrevious}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-medium hover:border-[#256B3E] hover:text-[#256B3E] transition-all duration-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Anterior
                  </motion.button>
                )}

                {currentStep < 3 ? (
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFD439] to-[#F4A300] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 ml-auto"
                  >
                    Siguiente
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#256B3E] to-[#1F5D34] text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 ml-auto disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
                        Registrando...
                      </>
                    ) : (
                      <>
                        Crear Cuenta
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                )}
              </div>

              {/* Error Message */}
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 mt-4 border border-red-200 bg-red-50 rounded-xl"
                >
                  <p className="flex items-center text-sm text-red-600">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {errors.submit}
                  </p>
                </motion.div>
              )}
            </form>

            {/* Login Link */}
            <div className="pt-6 mt-8 text-center border-t border-gray-200">
              <p className="text-sm text-[#256B3E]/60">
                ¿Ya tienes una cuenta?{" "}
                <a
                  href="/login"
                  className="text-[#F4A300] hover:text-[#FFD439] font-medium transition-colors"
                >
                  Inicia sesión aquí
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

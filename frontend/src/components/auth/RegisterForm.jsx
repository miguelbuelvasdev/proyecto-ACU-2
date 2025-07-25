import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, Mail, Lock, Phone, MapPin, Store, 
  ArrowRight, ArrowLeft, Check, AlertCircle,
  ChefHat, Users, Calendar, Eye, EyeOff
} from 'lucide-react';

const RegisterForm = ({ currentStep, setCurrentStep }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form data state
  const [formData, setFormData] = useState({
    // Step 1 - Restaurant Info
    restaurantName: '',
    restaurantType: '',
    capacity: '',
    foundedYear: '',
    
    // Step 2 - Contact Info
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    
    // Step 3 - Account Setup
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    subscribeNewsletter: false
  });

  const restaurantTypes = [
    'Restaurante Tradicional',
    'Comida Rápida',
    'Cafetería',
    'Food Truck',
    'Catering',
    'Hotel Restaurant',
    'Bar & Grill',
    'Otro'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!formData.restaurantName) newErrors.restaurantName = 'El nombre del restaurante es requerido';
        if (!formData.restaurantType) newErrors.restaurantType = 'Selecciona un tipo de restaurante';
        if (!formData.capacity) newErrors.capacity = 'La capacidad es requerida';
        if (!formData.foundedYear) newErrors.foundedYear = 'El año de fundación es requerido';
        break;
        
      case 2:
        if (!formData.ownerName) newErrors.ownerName = 'El nombre del propietario es requerido';
        if (!formData.email) newErrors.email = 'El email es requerido';
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
        if (!formData.phone) newErrors.phone = 'El teléfono es requerido';
        if (!formData.address) newErrors.address = 'La dirección es requerida';
        if (!formData.city) newErrors.city = 'La ciudad es requerida';
        break;
        
      case 3:
        if (!formData.password) newErrors.password = 'La contraseña es requerida';
        if (formData.password && formData.password.length < 8) newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
        if (!formData.acceptTerms) newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - redirect to dashboard or login
      navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: 'Error al registrar. Por favor intenta de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold gradient-text-gold mb-6">Información del Restaurante</h3>
            
            <div>
              <label className="block text-sm font-medium text-neutral-light/80 mb-2">
                Nombre del Restaurante
              </label>
              <div className="relative">
                <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-gold/60" />
                <input
                  type="text"
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleInputChange}
                  className="input-futuristic pl-10"
                  placeholder="Ej: La Cocina de María"
                />
              </div>
              {errors.restaurantName && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.restaurantName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-light/80 mb-2">
                Tipo de Restaurante
              </label>
              <div className="relative">
                <ChefHat className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-gold/60" />
                <select
                  name="restaurantType"
                  value={formData.restaurantType}
                  onChange={handleInputChange}
                  className="input-futuristic pl-10 appearance-none"
                >
                  <option value="">Selecciona un tipo</option>
                  {restaurantTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              {errors.restaurantType && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.restaurantType}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-light/80 mb-2">
                  Capacidad (personas)
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-gold/60" />
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className="input-futuristic pl-10"
                    placeholder="Ej: 50"
                    min="1"
                  />
                </div>
                {errors.capacity && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.capacity}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-light/80 mb-2">
                  Año de Fundación
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-gold/60" />
                  <input
                    type="number"
                    name="foundedYear"
                    value={formData.foundedYear}
                    onChange={handleInputChange}
                    className="input-futuristic pl-10"
                    placeholder={new Date().getFullYear()}
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
                {errors.foundedYear && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
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
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold gradient-text-gold mb-6">Información de Contacto</h3>
            
            <div>
              <label className="block text-sm font-medium text-neutral-light/80 mb-2">
                Nombre del Propietario/Gerente
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-gold/60" />
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  className="input-futuristic pl-10"
                  placeholder="Nombre completo"
                />
              </div>
              {errors.ownerName && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.ownerName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-light/80 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-gold/60" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-futuristic pl-10"
                  placeholder="correo@ejemplo.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-light/80 mb-2">
                Teléfono
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-gold/60" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input-futuristic pl-10"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-light/80 mb-2">
                Dirección
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-gold/60" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="input-futuristic pl-10"
                  placeholder="Calle Principal #123"
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.address}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-light/80 mb-2">
                Ciudad
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-gold/60" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="input-futuristic pl-10"
                  placeholder="Ciudad, Estado/Provincia"
                />
              </div>
              {errors.city && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
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
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold gradient-text-gold mb-6">Configuración de Cuenta</h3>
            
            <div>
              <label className="block text-sm font-medium text-neutral-light/80 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-gold/60" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input-futuristic pl-10 pr-12"
                  placeholder="Mínimo 8 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-light/60 hover:text-primary-gold transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-light/80 mb-2">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-gold/60" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="input-futuristic pl-10 pr-12"
                  placeholder="Repetir contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-light/60 hover:text-primary-gold transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="space-y-3 mt-6">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-2 border-primary-gold bg-neutral-dark checked:bg-primary-gold focus:ring-2 focus:ring-primary-goldLight"
                />
                <span className="text-sm text-neutral-light/80">
                  Acepto los{' '}
                  <Link to="/terms" className="text-primary-gold hover:text-primary-goldLight">
                    términos y condiciones
                  </Link>
                  {' '}y la{' '}
                  <Link to="/privacy" className="text-primary-gold hover:text-primary-goldLight">
                    política de privacidad
                  </Link>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="text-red-500 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.acceptTerms}
                </p>
              )}

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-2 border-primary-gold bg-neutral-dark checked:bg-primary-gold focus:ring-2 focus:ring-primary-goldLight"
                />
                <span className="text-sm text-neutral-light/80">
                  Quiero recibir tips de sostenibilidad y novedades
                </span>
              </label>
            </div>

            {errors.submit && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-500">{errors.submit}</span>
              </div>
            )}
          </motion.div>
        );
    }
  };

  return (
    <div className="glass-effect rounded-3xl p-8 shadow-2xl">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex items-center ${step < 3 ? 'flex-1' : ''}`}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: currentStep >= step ? 1.1 : 1,
                  backgroundColor: currentStep >= step ? '#D4AF37' : '#4A4A4A'
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-neutral-dark font-bold
                  ${currentStep >= step ? 'shadow-glow-gold' : 'border-2 border-neutral-light/20'}`}
              >
                {currentStep > step ? <Check className="w-5 h-5" /> : step}
              </motion.div>
              
              {step < 3 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: currentStep > step ? 1 : 0 }}
                  className="flex-1 h-0.5 bg-primary-gold mx-2 origin-left"
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-between text-sm">
          <span className={currentStep >= 1 ? 'text-primary-gold' : 'text-neutral-light/60'}>
            Restaurante
          </span>
          <span className={currentStep >= 2 ? 'text-primary-gold' : 'text-neutral-light/60'}>
            Contacto
          </span>
          <span className={currentStep >= 3 ? 'text-primary-gold' : 'text-neutral-light/60'}>
            Cuenta
          </span>
        </div>
      </div>

      {/* Form Steps */}
      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <motion.button
              type="button"
              onClick={handlePrevious}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-6 py-3 rounded-full border-2 border-neutral-light/30 text-neutral-light hover:border-primary-gold hover:text-primary-gold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Anterior</span>
            </motion.button>
          )}

          {currentStep < 3 ? (
            <motion.button
              type="button"
              onClick={handleNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-futuristic flex items-center space-x-2 ml-auto"
            >
              <span>Siguiente</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-futuristic flex items-center space-x-2 ml-auto"
            >
              {isLoading ? (
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-neutral-dark"></span>
                  <span>Registrando...</span>
                </>
              ) : (
                <>
                  <span>Completar Registro</span>
                  <Check className="w-5 h-5" />
                </>
              )}
            </motion.button>
          )}
        </div>
      </form>

      {/* Login Link */}
      <div className="text-center mt-6 pt-6 border-t border-neutral-light/10">
        <p className="text-neutral-light/60">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-primary-gold hover:text-primary-goldLight font-medium">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;


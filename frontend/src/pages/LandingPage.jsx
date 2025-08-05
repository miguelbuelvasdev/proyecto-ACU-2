import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Recycle, BarChart3, GraduationCap, Leaf, ArrowRight, Users, Award, Sparkles, Menu, X, BookOpen, Shield, Target, TrendingUp, AlertTriangle, Thermometer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';


const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  const features = [
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Contenido Multimedia",
      description: "Módulos interactivos con videos, infografías y simulaciones para aprender el manejo seguro del ACU.",
      color: "from-[#F4A300] to-[#FFD439]",
      accent: "#F4A300"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Protocolos de Seguridad",
      description: "Aprende los procedimientos de emergencia para quemaduras, incendios y derrames de aceite.",
      color: "from-[#F4A300] to-[#FFD439]",
      accent: "#256B3E"
    },
    {
      icon: <Thermometer className="w-12 h-12" />,
      title: "Gestión de Calidad",
      description: "Domina el punto de humo, filtrado y reconocimiento de signos de degradación del aceite.",
      color: "from-[#F4A300] to-[#FFD439]",
      accent: "#FFD439"
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Certificación Digital",
      description: "Obtén tu certificado oficial al completar todos los módulos del programa educativo.",
      color: "from-[#F4A300] to-[#FFD439]",
      accent: "#64748B"
    }
  ];

  const stats = [
    { value: "0+", label: "Restaurantes Capacitados", icon: <Target className="w-6 h-6" /> },
    { value: "0%", label: "Tasa de Aprobación", icon: <TrendingUp className="w-6 h-6" /> },
    { value: "0+", label: "Litros ACU Gestionados", icon: <Recycle className="w-6 h-6" /> },
    { value: "24/7", label: "Acceso al Contenido", icon: <BookOpen className="w-6 h-6" /> }
  ];

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#caracteristicas", label: "Módulos" },
    { href: "#estadisticas", label: "Resultados" },
    { href: "#contacto", label: "Contacto" }
  ];

  return (
    <div className="min-h-screen bg-white text-[#256B3E] overflow-x-hidden font-['Inter',sans-serif]">
      {/* Futuristic Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-[#FFD439]/10 to-[#F4A300]/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-l from-[#256B3E]/10 to-[#FCD94B]/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-[#F4A300]/5 to-[#FFD439]/5 rounded-full filter blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Advanced Navigation */}
      <nav className="fixed w-full z-50 px-4 sm:px-6 py-4">
        <div className="container mx-auto">
          <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl px-6 py-4 shadow-lg shadow-black/5">
            <div className="flex justify-between items-center">
              {/* Premium Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#FFD439] to-[#F4A300] rounded-xl shadow-lg shadow-[#FFD439]/25"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD439] to-[#F4A300] rounded-xl animate-pulse opacity-75"></div>
                </div>
                <div>
                  <span className="text-2xl font-bold text-[#256B3E]">EcoAceite</span>
                  <div className="text-xs text-[#256B3E]/70 font-medium tracking-wider">OVA EDUCATIVO</div>
                </div>
              </motion.div>

              {/* Desktop Menu */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:flex items-center space-x-8"
              >
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    whileHover={{ y: -2 }}
                    className="text-[#256B3E] hover:text-[#F4A300] font-medium transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FFD439] to-[#F4A300] group-hover:w-full transition-all duration-300"></span>
                  </motion.a>
                ))}
              </motion.div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden mobile-menu-container">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileMenuOpen(!mobileMenuOpen);
                  }}
                  className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6 text-[#256B3E]" />
                  ) : (
                    <Menu className="w-6 h-6 text-[#256B3E]" />
                  )}
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="lg:hidden mt-6 mobile-menu-container"
                >
                  <div className="bg-gray-50/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200/50">
                    <div className="flex flex-col space-y-4">
                      {navLinks.map((link) => (
                        <motion.a
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          whileHover={{ x: 10 }}
                          className="text-[#256B3E] hover:text-[#F4A300] font-medium py-2 transition-colors"
                        >
                          {link.label}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-32 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center z-10">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Educational Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 rounded-full px-4 py-2 mb-8"
              >
                <BookOpen className="w-4 h-4 text-[#F4A300]" />
                <span className="text-sm font-medium text-[#256B3E]">Objeto Virtual de Aprendizaje</span>
                <div className="w-2 h-2 bg-[#FFD439] rounded-full animate-pulse"></div>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="block text-[#256B3E] mb-2">Bienvenido al Futuro</span>
                <span className="block bg-gradient-to-r from-[#F4A300] via-[#FFD439] to-[#256B3E] bg-clip-text text-transparent">
                  del Aprendizaje
                </span>
                <span className="block text-[#256B3E] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-4">
                  Gastronómico Sostenible
                </span>
              </h1>

              <p className="text-xl text-[#256B3E]/80 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Plataforma educativa interactiva para aprender el manejo seguro y responsable del 
                Aceite de Cocina Usado (ACU) según normativas colombianas vigentes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  onClick={() => navigate('/register')}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(244, 163, 0, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-[#FFD439] to-[#F4A300] text-white rounded-2xl font-bold shadow-xl shadow-[#FFD439]/25 hover:shadow-2xl hover:shadow-[#FFD439]/40 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    Registrase
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
                
                <motion.button
                  onClick={() => navigate('/login')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-[#256B3E] text-[#256B3E] hover:bg-[#256B3E]/10 rounded-2xl font-bold transition-all duration-300"
                >
                  Iniciar Sesión
                </motion.button>
              </div>
            </motion.div>

            {/* Right Content - Educational Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD439]/20 via-transparent to-[#256B3E]/20 z-10"></div>
                  <img 
                    src="https://placehold.co/800x600" 
                    alt="Chef profesional en cocina comercial aprendiendo sobre manejo seguro de aceite de cocina usado, con elementos educativos, termómetro para punto de humo, filtros de aceite, contenedores de almacenamiento, señalización de seguridad"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Educational Elements */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-6 right-6 w-20 h-20 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg shadow-black/10"
                  >
                    <Shield className="w-10 h-10 text-[#256B3E]" />
                  </motion.div>
                  
                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-6 left-6 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg shadow-black/10"
                  >
                    <AlertTriangle className="w-8 h-8 text-[#F4A300]" />
                  </motion.div>
                  
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-[#FFD439] to-[#F4A300] rounded-full flex items-center justify-center shadow-lg shadow-[#FFD439]/30"
                  >
                    <Thermometer className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block"
        >
          <ChevronDown className="w-8 h-8 text-[#F4A300]" />
        </motion.div>
      </section>

      {/* Modules Section */}
      <section id="caracteristicas" className="py-20 relative z-10 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-2 mb-6">
              <BookOpen className="w-4 h-4 text-[#F4A300]" />
              <span className="text-sm font-medium text-[#256B3E]">Capacitación Integral</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#256B3E]">
              Módulos Educativos Interactivos
            </h2>
            <p className="text-xl text-[#256B3E]/80 max-w-3xl mx-auto">
              Aprende sobre el manejo seguro y responsable del ACU a través de nuestro contenido multimedia
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative"
              >
                <div className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300">
                  <div className={`${feature.color} absolute inset-0 rounded-2xl`}>
                    <div className="bg-white rounded-2xl w-full h-full"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#256B3E] group-hover:text-[#256B3E]/90">
                      {feature.title}
                    </h3>
                    <p className="text-[#256B3E]/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="estadisticas" className="py-20 relative z-10 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="relative bg-white border border-gray-200 rounded-3xl p-12 shadow-xl shadow-black/10 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#FFD439] to-[#256B3E]"></div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 relative z-10"
            >
              <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-2 mb-6">
                <TrendingUp className="w-4 h-4 text-[#256B3E]" />
                <span className="text-sm font-medium text-[#256B3E]">Impacto Comprobado</span>
              </div>
              <h2 className="text-4xl font-bold mb-4 text-[#256B3E]">
                Resultados de Nuestro Programa
              </h2>
              <p className="text-xl text-[#256B3E]/80">
                Transformando la gestión de ACU en cocinas comerciales
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#F4A300] to-[#256B3E] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-[#256B3E]/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#256B3E] to-[#1F5D34] rounded-3xl p-12 text-center text-white overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-6 right-6 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-6 left-6 w-24 h-24 bg-[#FFD439] rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-10 h-10 text-[#FFD439]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Únete a la Revolución del ACU
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Capacita a tu personal en el manejo seguro y responsable del Aceite de Cocina Usado
              </p>
              <motion.button
                onClick={() => navigate('/register')}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 212, 57, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-[#FFD439] to-[#F4A300] text-[#256B3E] rounded-2xl font-bold text-lg shadow-xl shadow-[#FFD439]/25 hover:shadow-2xl hover:shadow-[#FFD439]/40 transition-all duration-300"
              >
                Comenzar Ahora
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-16 px-4 sm:px-6 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FFD439] to-[#F4A300] rounded-xl"></div>
              <div>
                <span className="text-2xl font-bold text-[#256B3E]">EcoAceite</span>
                <div className="text-xs text-[#256B3E]/70 font-medium tracking-wider">OBJETO VIRTUAL DE APRENDIZAJE</div>
              </div>
            </div>
            <p className="text-[#256B3E]/70 mb-6 max-w-md leading-relaxed mx-auto md:mx-0">
              Plataforma educativa para el manejo seguro y responsable del Aceite de Cocina Usado en cocinas comerciales.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-[#F4A300] hover:bg-[#F4A300] group transition-all duration-300 cursor-pointer">
                <FaFacebookF className="w-4 h-4 text-[#256B3E] group-hover:text-white transition-colors" />
              </div>
              <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-[#F4A300] hover:bg-[#F4A300] group transition-all duration-300 cursor-pointer">
                <FaTwitter className="w-4 h-4 text-[#256B3E] group-hover:text-white transition-colors" />
              </div>
              <div className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-[#F4A300] hover:bg-[#F4A300] group transition-all duration-300 cursor-pointer">
                <FaLinkedinIn className="w-4 h-4 text-[#256B3E] group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>

          {/* Enlaces de Plataforma */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4 text-[#256B3E]">Plataforma</h3>
            <nav>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a 
                      href={link.href} 
                      className="text-[#256B3E]/70 hover:text-[#F4A300] transition-colors inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Enlaces de Recursos */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-4 text-[#256B3E]">Recursos</h3>
            <nav>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-[#256B3E]/70 hover:text-[#F4A300] transition-colors inline-block">
                    Documentos técnicos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#256B3E]/70 hover:text-[#F4A300] transition-colors inline-block">
                    Normatividad ACU
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#256B3E]/70 hover:text-[#F4A300] transition-colors inline-block">
                    Guías prácticas
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#256B3E]/70 hover:text-[#F4A300] transition-colors inline-block">
                    Preguntas frecuentes
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200 text-center">
          <p className="text-[#256B3E]/50 text-sm">
            © {new Date().getFullYear()} EcoAceite OVA. Todos los derechos reservados.
          </p>
          <div className="mt-2 text-[#256B3E]/50 text-sm">
            <a href="#" className="hover:text-[#F4A300] transition-colors">Términos</a>
            <span className="mx-2">•</span>
            <a href="#" className="hover:text-[#F4A300] transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>

      
    </div>
  );
};

export default LandingPage;

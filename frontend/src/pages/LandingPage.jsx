import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Recycle, BarChart3, GraduationCap, Leaf, ArrowRight, Users, Award, Sparkles, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
      icon: <GraduationCap className="w-10 h-10" />,
      title: "Aprendizaje Interactivo",
      description: "Contenido multimedia dinámico diseñado para transformar la educación gastronómica sostenible.",
      color: "text-accent-blue"
    },
    {
      icon: <Recycle className="w-10 h-10" />,
      title: "Gestión Sostenible",
      description: "Aprende las mejores prácticas para el manejo responsable del aceite de cocina usado.",
      color: "text-primary-gold"
    },
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: "Dashboard Analítico",
      description: "Visualiza tu progreso y el impacto ambiental con métricas en tiempo real.",
      color: "text-accent-purple"
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "Certificación Digital",
      description: "Obtén reconocimiento oficial por completar el programa de sostenibilidad.",
      color: "text-status-success"
    }
  ];

  const stats = [
    { value: "500+", label: "Restaurantes Activos" },
    { value: "95%", label: "Tasa de Satisfacción" },
    { value: "10k", label: "Litros Reciclados" },
    { value: "24/7", label: "Soporte Disponible" }
  ];

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#caracteristicas", label: "Características" },
    { href: "#estadisticas", label: "Impacto" },
    { href: "#contacto", label: "Contacto" }
  ];

  return (
    <div className="min-h-screen bg-neutral-dark overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-accent-purple/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-gold/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="navbar-blur fixed w-full z-50 px-4 sm:px-6 py-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 sm:space-x-3"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-gold rounded-full animate-pulse"></div>
              <span className="text-xl sm:text-2xl font-bold gradient-text-gold">EcoAceite</span>
            </motion.div>

            {/* Desktop Menu */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:flex items-center space-x-8"
            >
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="hover:text-primary-gold transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-futuristic ml-4"
              >
                Comenzar Ahora
              </motion.button>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden mobile-menu-container">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="p-2 rounded-lg bg-neutral-light/10 hover:bg-neutral-light/20 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-neutral-light" />
                ) : (
                  <Menu className="w-6 h-6 text-neutral-light" />
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
                className="lg:hidden mt-4 mobile-menu-container"
              >
                <div className="bg-neutral-dark/95 backdrop-blur-lg rounded-2xl p-6 border border-neutral-light/10">
                  <div className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        whileHover={{ x: 10 }}
                        className="text-neutral-light hover:text-primary-gold transition-colors py-2"
                      >
                        {link.label}
                      </motion.a>
                    ))}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-futuristic w-full mt-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Comenzar Ahora
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center z-10">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              {/* Animated Icon Group */}
              <div className="flex justify-center lg:justify-start space-x-4 mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-accent-blue to-accent-purple rounded-xl flex items-center justify-center shadow-glow-blue"
                >
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-gold to-orange-500 rounded-xl flex items-center justify-center shadow-glow-gold"
                >
                  <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-glow-green"
                >
                  <Recycle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </motion.div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6">
                <span className="gradient-text-gold">Bienvenido al Futuro</span>
                <br />
                <span className="text-neutral-light">del Aprendizaje</span>
                <br />
                <span className="gradient-text-blue">Gastronómico Sostenible</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl mb-8 text-neutral-light/80 max-w-3xl mx-auto lg:mx-0">
                Transforma tu cocina en un motor de cambio ecológico. 
                Únete a la revolución de restaurantes comprometidos con el medio ambiente.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => navigate('/register')}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 175, 55, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-futuristic flex items-center justify-center gap-2"
                >
                  Regístrate
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  onClick={() => navigate('/login')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full border-2 border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-neutral-dark transition-all duration-300"
                >
                  Iniciar Sesión
                </motion.button>
              </div>
            </motion.div>

            {/* Right Content - Chef Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-primary-gold/20 z-10"></div>
                <img 
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bce02c26-d3f7-4078-b283-bcfbd028e8f7.png" 
                  alt="Chef afrodescendiente profesional en cocina futurista con hologramas de recetas flotando, pantallas digitales mostrando datos de sostenibilidad, iluminación LED azul y púrpura, equipamiento de alta tecnología, uniforme de chef moderno blanco con detalles dorados"
                  className="w-full h-full object-cover"
                />
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-4 sm:top-10 right-4 sm:right-10 w-16 h-16 sm:w-20 sm:h-20 bg-primary-gold/30 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 text-primary-gold" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-4 sm:bottom-10 left-4 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 bg-accent-blue/30 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-accent-blue" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden sm:block"
        >
          <ChevronDown className="w-8 h-8 text-primary-gold" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="caracteristicas" className="py-16 sm:py-20 relative z-10 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text-gold">Características Principales</span>
                        </h2>
            <p className="text-lg sm:text-xl text-neutral-light/70 max-w-3xl mx-auto">
              Herramientas diseñadas para revolucionar la sostenibilidad en tu cocina
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="card-feature group"
              >
                <div className={`${feature.color} mb-4 group-hover:animate-pulse`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 gradient-text-gold">
                  {feature.title}
                </h3>
                <p className="text-neutral-light/70">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="estadisticas" className="py-16 sm:py-20 relative z-10 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="gradient-text-gold">Nuestro Impacto</span>
              </h2>
              <p className="text-lg sm:text-xl text-neutral-light/70">
                Juntos estamos construyendo un futuro más sostenible
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text-blue mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-neutral-light/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 relative z-10 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-effect rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center bg-gradient-to-br from-primary-gold/10 to-accent-blue/10"
          >
            <Leaf className="w-12 h-12 sm:w-16 sm:h-16 text-primary-gold mx-auto mb-6 animate-float" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text-gold">¿Listo para el cambio?</span>
            </h2>
            <p className="text-lg sm:text-xl text-neutral-light/80 mb-8 max-w-2xl mx-auto">
              Únete a la red de restaurantes que están transformando la industria gastronómica 
              con prácticas sostenibles e innovadoras.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212, 175, 55, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              className="btn-futuristic text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4"
            >
              Comenzar Mi Transformación
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="text-center bg-gradient-to-b from-neutral-dark to-black py-12 sm:py-16 border-t border-neutral-light/10 px-4 sm:px-6">
        
      </footer>
    </div>
  );
};

export default LandingPage;

              
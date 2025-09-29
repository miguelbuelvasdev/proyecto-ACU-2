import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Recycle,
  BarChart3,
  GraduationCap,
  Leaf,
  ArrowRight,
  Users,
  Award,
  Sparkles,
  Menu,
  X,
  BookOpen,
  Shield,
  Target,
  TrendingUp,
  AlertTriangle,
  Thermometer,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import logoOVA from "../assets/logoOVA.svg";
import marimar from "../assets/marimar.jpg";
import logoUnisinu from "../assets/logo-unisinu-cartagena-rojo.png";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [classification, setClassification] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest(".mobile-menu-container")) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!userId || !token) return;
    fetch(`${API_BASE_URL}/restaurant/by-user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setClassification(data.classification || ""));
  }, [userId, token]);

  const stats = [
    {
      value: "50+",
      label: "Restaurantes Caracterizados",
      icon: <Target className="w-6 h-6" />,
    },
    {
      value: "25+",
      label: "Establecimientos Dentro de la Competencia",
      icon: <TrendingUp className="w-6 h-6" />,
    },

    {
      value: "24/7",
      label: "Acceso al Contenido",
      icon: <BookOpen className="w-6 h-6" />,
    },
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
      <nav className="fixed z-50 w-full px-4 py-4 sm:px-6">
        <div className="container mx-auto">
          <div className="px-6 py-4 border shadow-lg bg-white/80 backdrop-blur-xl border-gray-200/50 rounded-2xl shadow-black/5">
            <div className="flex items-center justify-between">
              {/* Premium Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center"
              >
                <img
                  src={logoOVA}
                  alt="EcoAceite OVA Logo"
                  className="object-contain w-32 h-16"
                />
              </motion.div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden mobile-menu-container">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileMenuOpen(!mobileMenuOpen);
                  }}
                  className="p-3 transition-colors border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100"
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6 text-[#256B3E]" />
                  ) : (
                    <Menu className="w-6 h-6 text-[#256B3E]" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative flex items-center justify-center min-h-screen px-4 pt-32 sm:px-6"
      >
        <div className="container mx-auto">
          <div className="z-10 grid items-center gap-12 lg:grid-cols-2">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-[#256B3E]">
                <span className="block mb-2">Centro de Formación Virtual</span>
                <span className="block text-[#f0cd2b]">Cocina Heróica</span>
              </h1>

              <p className="text-xl text-[#256B3E]/80 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Plataforma educativa interactiva para aprender el manejo seguro
                y responsable de Grasas y Aceite de Cocina Usado (ACU) según
                normativas colombianas vigentes.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <motion.button
                  onClick={() => navigate("/register")}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(244, 163, 0, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-[#FFD439] to-[#F4A300] text-white rounded-2xl font-bold shadow-xl shadow-[#FFD439]/25 hover:shadow-2xl hover:shadow-[#FFD439]/40 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    Regístrate
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.button>

                <motion.button
                  onClick={() => navigate("/login")}
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
                <div className="relative overflow-hidden shadow-2xl rounded-3xl shadow-black/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFD439]/20 via-transparent to-[#256B3E]/20 z-10"></div>
                  <img
                    src={marimar}
                    alt="Chef profesional en cocina comercial aprendiendo sobre manejo seguro de aceite de cocina usado, con elementos educativos, termómetro para punto de humo, filtros de aceite, contenedores de almacenamiento, señalización de seguridad"
                    className="object-cover w-full h-full"
                  />

                  {/* Educational Elements */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute flex items-center justify-center w-20 h-20 shadow-lg top-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-black/10"
                  >
                    <Shield className="w-10 h-10 text-[#256B3E]" />
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    className="absolute flex items-center justify-center w-16 h-16 shadow-lg bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-black/10"
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
          className="absolute hidden transform -translate-x-1/2 bottom-10 left-1/2 sm:block"
        >
          <ChevronDown className="w-8 h-8 text-[#F4A300]" />
        </motion.div>
      </section>

      {/* Results Section */}
      <section id="estadisticas" className="relative z-10 px-4 py-20 sm:px-6">
        <div className="container mx-auto">
          <div className="relative p-12 overflow-hidden bg-white border border-gray-200 shadow-xl rounded-3xl shadow-black/10">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#FFD439] to-[#256B3E]"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative z-10 mb-12 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gray-100 border border-gray-200 rounded-full">
                <TrendingUp className="w-4 h-4 text-[#256B3E]" />
                <span className="text-sm font-medium text-[#256B3E]">
                  Impacto Comprobado
                </span>
              </div>
              <h2 className="text-4xl font-bold mb-4 text-[#256B3E]">
                Resultados de Nuestro Programa
              </h2>
              <p className="text-xl text-[#256B3E]/80">
                Transformando la gestión de Grasas y ACU en cocinas comerciales
              </p>
            </motion.div>

            <div className="relative z-10 grid grid-cols-2 gap-8 md:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-transform duration-300 border border-gray-200 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl group-hover:scale-110">
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#F4A300] to-[#256B3E] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-[#256B3E]/70">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-4 py-20 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#256B3E] to-[#1F5D34] rounded-3xl p-12 text-center text-white overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute w-32 h-32 bg-white rounded-full top-6 right-6"></div>
              <div className="absolute bottom-6 left-6 w-24 h-24 bg-[#FFD439] rounded-full"></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-2xl">
                <Leaf className="w-10 h-10 text-[#FFD439]" />
              </div>
              <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                Eco-sistema G: <br /> Por una correcta gestión de Grasas y
                Aceites
              </h2>
              <p className="max-w-2xl mx-auto mb-8 text-xl leading-relaxed text-white/90">
                ¡Transforma tu cocina, renueva la ciudad!
              </p>
              <motion.button
                onClick={() => navigate("/register")}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 212, 57, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-[#FFD439] to-[#F4A300] text-[#256B3E] rounded-2xl font-bold text-lg shadow-xl shadow-[#FFD439]/25 hover:shadow-2xl hover:shadow-[#FFD439]/40 transition-all duration-300"
              >
                Comenzar Ahora
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sección Institucional Unisinu */}
      <section className="relative z-10 px-4 py-12 bg-white sm:px-6">
        <div className="container flex flex-col items-center gap-8 mx-auto md:flex-row">
          <img
            src={logoUnisinu}
            alt="Logo Universidad del Sinú Cartagena"
            className="h-auto mb-6 w-96 md:mb-0 md:mr-8"
          />
          <div>
            <h3 className="text-2xl font-bold text-[#256B3E] mb-2">
              EcoRestaurantes
            </h3>
            <p className="text-[#256B3E]/80 text-lg max-w-xl">
              Visualización de resultados de aplicación de Objeto Virtual de
              Aprendizaje sobre el manejo de aceites y grasas en los
              restaurantes del centro histórico la ciudad de Cartagena, es un
              proyecto de la Universidad del Sinú, financiado por la Dirección
              de Investigación, dirigido por la Ing. Carolina Herrera del
              Programa de Ingeniería Industrial.
            </p>
          </div>
        </div>
      </section>

      <footer className="px-4 py-16 border-t border-gray-200 sm:px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-4">
            {/* Logo y descripción */}
            <div className="col-span-1 text-center md:col-span-2 md:text-left">
              <div className="flex items-center justify-center mb-6 md:justify-start">
                <img
                  src={logoOVA}
                  alt="EcoAceite OVA Logo"
                  className="object-contain w-64 h-32"
                />
              </div>
              <p className="text-[#256B3E]/70 mb-6 max-w-md leading-relaxed mx-auto md:mx-0">
                Plataforma educativa para el manejo seguro y responsable de
                Grasas y Aceite de Cocina Usado en cocinas comerciales.
              </p>
              <div className="flex justify-center space-x-4 md:justify-start">
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

            {/* Enlaces de Recursos */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold mb-4 text-[#256B3E]">
                Recursos
              </h3>
              <nav>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-[#256B3E]/70 hover:text-[#F4A300] transition-colors inline-block"
                    >
                      Documentos técnicos
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#256B3E]/70 hover:text-[#F4A300] transition-colors inline-block"
                    >
                      Normatividad ACU
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#256B3E]/70 hover:text-[#F4A300] transition-colors inline-block"
                    >
                      Guías prácticas
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-[#256B3E]/70 hover:text-[#F4A300] transition-colors inline-block"
                    >
                      Preguntas frecuentes
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 text-center border-t border-gray-200">
            <p className="text-[#256B3E]/50 text-sm">
              © {new Date().getFullYear()} Desarrollado por QData SAS.
            </p>
            <div className="mt-2 text-[#256B3E]/50 text-sm">
              <a href="#" className="hover:text-[#F4A300] transition-colors">
                Términos
              </a>
              <span className="mx-2">•</span>
              <a href="#" className="hover:text-[#F4A300] transition-colors">
                Privacidad
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

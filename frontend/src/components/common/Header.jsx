
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, BookOpen, BarChart3, Users, Award, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = ({ user = null, isAuthenticated = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const publicNavLinks = [
    { href: '/', label: 'Inicio', icon: <Home className="w-4 h-4" /> },
    { href: '/about', label: 'Acerca de', icon: <BookOpen className="w-4 h-4" /> },
    { href: '/features', label: 'Características', icon: <Award className="w-4 h-4" /> },
    { href: '/contact', label: 'Contacto', icon: <Users className="w-4 h-4" /> }
  ];

  const authenticatedNavLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { href: '/courses', label: 'Cursos', icon: <BookOpen className="w-4 h-4" /> },
    { href: '/analytics', label: 'Analíticas', icon: <BarChart3 className="w-4 h-4" /> },
    { href: '/community', label: 'Comunidad', icon: <Users className="w-4 h-4" /> },
    { href: '/certificates', label: 'Certificados', icon: <Award className="w-4 h-4" /> }
  ];

  const navLinks = isAuthenticated ? authenticatedNavLinks : publicNavLinks;

  const userMenuItems = [
    { label: 'Mi Perfil', icon: <Users className="w-4 h-4" />, action: () => navigate('/profile') },
    { label: 'Configuración', icon: <Settings className="w-4 h-4" />, action: () => navigate('/settings') },
    { label: 'Cerrar Sesión', icon: <LogOut className="w-4 h-4" />, action: () => handleLogout() }
  ];

  const handleLogout = () => {
    // Aquí iría la lógica de logout
    console.log('Logging out...');
    navigate('/');
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'navbar-blur shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-gold rounded-full"
            />
            <span className="text-xl sm:text-2xl font-bold gradient-text-gold">EcoAceite</span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:flex items-center space-x-8"
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(link.href);
                }}
                className={`flex items-center gap-2 hover:text-primary-gold transition-colors ${
                  location.pathname === link.href ? 'text-primary-gold' : 'text-neutral-light'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
                {link.label}
              </motion.a>
            ))}

            {/* User Menu or Auth Buttons */}
            {isAuthenticated && user ? (
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-light/10 hover:bg-neutral-light/20 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center">
                    <span className="text-sm font-bold text-neutral-dark">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-neutral-light">{user.name}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 glass-effect rounded-xl overflow-hidden shadow-xl"
                    >
                      <div className="p-4 border-b border-neutral-light/10">
                        <p className="text-sm text-neutral-light/60">Sesión iniciada como</p>
                        <p className="font-semibold text-neutral-light">{user.email}</p>
                      </div>
                      {userMenuItems.map((item, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                          onClick={item.action}
                          className="w-full flex items-center gap-3 px-4 py-3 text-neutral-light hover:text-primary-gold transition-colors"
                        >
                          {item.icon}
                          {item.label}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className="px-6 py-2 text-neutral-light hover:text-primary-gold transition-colors"
                >
                  Iniciar Sesión
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/register')}
                  className="btn-futuristic"
                >
                  Registrarse
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
              className="lg:hidden mt-4"
            >
              <div className="glass-effect rounded-2xl p-6">
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(link.href);
                        setMobileMenuOpen(false);
                      }}
                      whileHover={{ x: 10 }}
                      className={`flex items-center gap-3 py-2 ${
                        location.pathname === link.href ? 'text-primary-gold' : 'text-neutral-light'
                      } hover:text-primary-gold transition-colors`}
                    >
                      {link.icon}
                      {link.label}
                    </motion.a>
                  ))}
                </nav>

                {/* Mobile User Section */}
                <div className="mt-6 pt-6 border-t border-neutral-light/10">
                  {isAuthenticated && user ? (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                          <span className="text-lg font-bold text-neutral-dark">
                            {user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-light">{user.name}</p>
                          <p className="text-sm text-neutral-light/60">{user.email}</p>
                        </div>
                      </div>
                      {userMenuItems.map((item, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ x: 10 }}
                          onClick={() => {
                            item.action();
                            setMobileMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 py-2 text-neutral-light hover:text-primary-gold transition-colors"
                        >
                          {item.icon}
                          {item.label}
                        </motion.button>
                      ))}
                    </>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          navigate('/login');
                          setMobileMenuOpen(false);
                        }}
                        className="w-full py-3 rounded-full border border-neutral-light/30 text-neutral-light hover:bg-neutral-light/10 transition-colors"
                      >
                        Iniciar Sesión
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          navigate('/register');
                          setMobileMenuOpen(false);
                        }}
                        className="btn-futuristic w-full"
                      >
                        Registrarse
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;


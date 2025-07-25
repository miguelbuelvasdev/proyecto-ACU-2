import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Home,
  BookOpen,
  FileQuestion,
  BarChart3,
  User,
  Settings,
  LogOut,
  Bell,
  Play,
  Search,
  FileText,
  Image,
  Filter,
  Heart,
  AlertCircle
} from 'lucide-react';
import Footer from '../components/common/Footer'; // Asegúrate de que la ruta sea correcta

const ResourcesPage = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('recursos');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock user data
  const userData = {
    name: "María González",
    email: "maria@lacocinademaria.com",
    restaurant: "La Cocina de María",
    role: "Propietario"
  };

  // Mock resources data
  const resources = [
    {
      id: 1,
      title: "Guía Completa para el Reciclaje de Aceite Usado",
      description: "Paso a paso para recolectar y procesar aceite en tu restaurante.",
      category: "guide",
      type: "PDF",
      duration: "15 páginas",
      views: 456,
      thumbnail: "https://placehold.co/600x400?text=Guía+Reciclaje&font=roboto",
      url: "/resources/guide1.pdf"
    },
    {
      id: 2,
      title: "Video: Técnicas de Filtrado Sostenible",
      description: "Demostración práctica para extender la vida útil del aceite.",
      category: "video",
      type: "Video",
      duration: "10 min",
      views: 789,
      thumbnail: "https://placehold.co/600x400?text=Video+Filtrado&font=roboto",
      url: "https://youtube.com/watch?v=example"
    },
    {
      id: 3,
      title: "Infografía: Impacto Ambiental del Aceite Desechado",
      description: "Visualización de datos sobre contaminación y soluciones.",
      category: "infographic",
      type: "Imagen",
      duration: "Visual",
      views: 234,
      thumbnail: "https://placehold.co/600x400?text=Infografía+Impacto&font=roboto",
      url: "/resources/infographic.jpg"
    },
    {
      id: 4,
      title: "Artículo: Normativas Legales en Colombia",
      description: "Requisitos legales para el manejo de residuos en restaurantes.",
      category: "article",
      type: "Artículo",
      duration: "Lectura 8 min",
      views: 567,
      thumbnail: "https://placehold.co/600x400?text=Artículo+Normativas&font=roboto",
      url: "/blog/normativas"
    },
    {
      id: 5,
      title: "Guía: Implementación de Economía Circular",
      description: "Estrategias para reutilizar recursos en tu cocina.",
      category: "guide",
      type: "PDF",
      duration: "20 páginas",
      views: 345,
      thumbnail: "https://placehold.co/600x400?text=Guía+Economía+Circular&font=roboto",
      url: "/resources/guide2.pdf"
    }
  ];

  // Filtrar recursos
  const filteredResources = resources.filter(resource => 
    (selectedCategory === 'all' || resource.category === selectedCategory) &&
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    { id: 'all', label: 'Todos', icon: Filter },
    { id: 'guide', label: 'Guías', icon: FileText },
    { id: 'video', label: 'Videos', icon: Play },
    { id: 'infographic', label: 'Infografías', icon: Image },
    { id: 'article', label: 'Artículos', icon: BookOpen }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-menu-container')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-dark">
      {/* Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="navbar-blur fixed w-full z-40 px-4 sm:px-6 py-4"
      >
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => navigate('/home')}
              >
                <div className="w-10 h-10 bg-gradient-gold rounded-full animate-pulse"></div>
                <span className="text-2xl font-bold gradient-text-gold">EcoAceite</span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {[
                  { id: 'inicio', label: 'Inicio', icon: Home, path: '/home' },
                  { id: 'recursos', label: 'Recursos', icon: BookOpen, path: '/resources' },
                  { id: 'cuestionarios', label: 'Cuestionarios', icon: FileQuestion, path: '/exams' },
                  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' }
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setActiveNav(item.id);
                      handleNavigation(item.path);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
                      ${activeNav === item.id 
                        ? 'bg-primary-gold/20 text-primary-gold' 
                        : 'text-neutral-light/70 hover:text-neutral-light hover:bg-neutral-gray/30'
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Right Side - Notifications & Profile */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-lg hover:bg-neutral-gray/30 transition-colors"
              >
                <Bell className="w-6 h-6 text-neutral-light/70" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-gold rounded-full text-xs 
                                 text-neutral-dark font-bold flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </motion.button>

              {/* Profile Menu */}
              <div className="profile-menu-container relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowProfileMenu(!showProfileMenu);
                  }}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-gray/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-gold to-accent-purple rounded-full 
                                flex items-center justify-center text-neutral-dark font-bold">
                    {userData.name.charAt(0)}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-neutral-light">{userData.name}</p>
                    <p className="text-xs text-neutral-light/60">{userData.role}</p>
                  </div>
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 glass-effect rounded-xl shadow-2xl overflow-hidden"
                    >
                      {/* User Info Header */}
                      <div className="p-4 bg-neutral-gray/50 border-b border-neutral-light/10">
                        <p className="font-medium text-neutral-light">{userData.name}</p>
                        <p className="text-sm text-neutral-light/60">{userData.email}</p>
                        <p className="text-xs text-primary-gold mt-1">{userData.restaurant}</p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {[
                          { label: 'Mi Perfil', icon: User, path: '/profile' },
                          { label: 'Mi Restaurante', icon: User, path: '/restaurant' },
                          { label: 'Configuración', icon: Settings, path: '/settings' },
                          { label: 'Ayuda', icon: HelpCircle, path: '/help' },
                          { label: 'Cerrar Sesión', icon: LogOut, action: 'logout' }
                        ].map((item, index) => (
                          <motion.button
                            key={index}
                            onClick={() => {
                              if (item.action === 'logout') {
                                localStorage.removeItem('authToken');
                                navigate('/');
                              } else {
                                navigate(item.path);
                              }
                              setShowProfileMenu(false);
                            }}
                            whileHover={{ x: 5 }}
                            className="w-full px-4 py-3 flex items-center space-x-3 text-neutral-light/80 
                                     hover:text-neutral-light hover:bg-neutral-gray/30 transition-all duration-200"
                          >
                            <item.icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-neutral-gray/30 transition-colors"
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
                className="lg:hidden mt-4"
              >
                <div className="glass-effect rounded-2xl p-4">
                  {[
                    { id: 'inicio', label: 'Inicio', icon: Home, path: '/home' },
                    { id: 'recursos', label: 'Recursos', icon: BookOpen, path: '/resources' },
                    { id: 'cuestionarios', label: 'Cuestionarios', icon: FileQuestion, path: '/exams' },
                    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' }
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        setActiveNav(item.id);
                        handleNavigation(item.path);
                      }}
                      whileHover={{ x: 5 }}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-neutral-light/80 
                               hover:text-neutral-light hover:bg-neutral-gray/30 transition-all duration-200"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-2">
              <span className="gradient-text-gold">Recursos </span>
              <span className="text-neutral-light">Educativos</span>
            </h1>
            <p className="text-xl text-neutral-light/70">
              Explora materiales para mejorar la sostenibilidad en tu cocina
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-2xl p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              {/* Search Input */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-gold/60" />
                <input
                  type="text"
                  placeholder="Buscar recursos..."
                  className="input-futuristic pl-12 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <motion.button
                    key={cat.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                      ${selectedCategory === cat.id 
                        ? 'bg-primary-gold text-neutral-dark shadow-glow-gold' 
                        : 'bg-neutral-gray/30 text-neutral-light/70 hover:bg-neutral-gray/50'
                      }`}
                  >
                    <cat.icon className="w-4 h-4 inline-block mr-1" />
                    {cat.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Resources Grid */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredResources.map((resource) => (
              <motion.div
                key={resource.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
                className="glass-effect rounded-2xl p-4 overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl"
                onClick={() => navigate(resource.url)} // Redirige al hacer clic
              >
                {/* Thumbnail */}
                <div className="relative rounded-xl overflow-hidden mb-4">
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-neutral-dark/60 px-2 py-1 rounded-full text-xs text-neutral-light">
                    {resource.type}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-neutral-light mb-2 group-hover:text-primary-gold transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-neutral-light/60 mb-4">
                  {resource.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-neutral-light/50 mb-4">
                  <span className="flex items-center gap-1">
                    <span>{resource.duration}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    {resource.views} vistas
                  </span>
                </div>

                {/* Action Button */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-2 text-center rounded-full bg-primary-gold/20 text-primary-gold 
                             hover:bg-primary-gold/30 transition-colors font-medium text-sm"
                  >
                    Ver
                    <Play className="w-4 h-4 inline ml-1" />
                  </motion.button>
                </div>
              </motion.div>
                       ))}
          </motion.div>

          {filteredResources.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-neutral-light/60"
            >
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-primary-gold/50" />
              <p>No se encontraron recursos. Intenta con otra búsqueda.</p>
            </motion.div>
          )}
        </div>
      </div>

      <Footer /> {/* Footer al final */}
    </div>
  );
};

export default ResourcesPage;

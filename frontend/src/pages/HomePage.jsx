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
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  ChevronRight,
  Menu,
  X,
  Droplets,
  Leaf,
  Target,
  Users,
  HelpCircle
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('inicio');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Mock user data
  const userData = {
    name: "María González",
    email: "maria@lacocinademaria.com",
    restaurant: "La Cocina de María",
    avatar: null,
    role: "Propietario"
  };

  // Mock data para exámenes y estadísticas
  const pendingExams = [
    {
      id: 1,
      title: "Evaluación Módulo 3: Reciclaje Avanzado",
      dueDate: "2024-11-15",
      duration: "45 min",
      attempts: 0,
      maxAttempts: 3,
      difficulty: "Intermedio"
    },
    {
      id: 2,
      title: "Quiz: Normativas Ambientales",
      dueDate: "2024-11-20",
      duration: "20 min",
      attempts: 1,
      maxAttempts: 2,
      difficulty: "Básico"
    }
  ];

  const stats = {
    coursesCompleted: 2,
    coursesTotal: 5,
    averageScore: 85,
    certificationsEarned: 1,
    oilRecycled: 156
  };

  const recentResources = [
    {
      id: 1,
      title: "Guía: Almacenamiento Seguro del Aceite",
      type: "PDF",
      new: true
    },
    {
      id: 2,
      title: "Video: Proceso de Filtrado",
      type: "Video",
      new: true
    },
    {
      id: 3,
      title: "Infografía: Impacto Ambiental",
      type: "Imagen",
      new: false
    }
  ];

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home, path: '/home' },
    { id: 'recursos', label: 'Recursos', icon: BookOpen, path: '/resources' },
    { id: 'cuestionarios', label: 'Cuestionarios', icon: FileQuestion, path: '/exams' },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' }
  ];

  const profileMenuItems = [
    { label: 'Mi Perfil', icon: User, path: '/profile' },
    { label: 'Mi Restaurante', icon: Users, path: '/restaurant' },
    { label: 'Configuración', icon: Settings, path: '/settings' },
    { label: 'Ayuda', icon: HelpCircle, path: '/help' },
    { label: 'Cerrar Sesión', icon: LogOut, action: 'logout' }
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

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleProfileAction = (item) => {
    if (item.action === 'logout') {
      handleLogout();
    } else {
      navigate(item.path);
    }
    setShowProfileMenu(false);
  };

  return (
    <div className="min-h-screen bg-neutral-dark">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 -left-40 w-96 h-96 bg-accent-purple/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 -right-40 w-96 h-96 bg-primary-gold/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation Header */}
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
                {navItems.map((item) => (
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
                        {profileMenuItems.map((item, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handleProfileAction(item)}
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
                  {navItems.map((item) => (
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
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-2">
              <span className="gradient-text-gold">Bienvenido,</span>
              <span className="text-neutral-light ml-2">{userData.name}</span>
            </h1>
            <p className="text-xl text-neutral-light/70">
              Continúa tu viaje hacia la sostenibilidad gastronómica
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pending Exams */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-effect rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold gradient-text-gold flex items-center gap-2">
                    <FileQuestion className="w-7 h-7" />
                    Exámenes Pendientes
                  </h2>
                  <span className="text-sm text-neutral-light/60">
                    {pendingExams.length} por completar
                  </span>
                </div>

                <div className="space-y-4">
                  {pendingExams.map((exam) => (
                    <motion.div
                      key={exam.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-neutral-gray/50 rounded-xl p-5 border border-neutral-light/10 
                               hover:border-primary-gold/50 transition-all duration-300 cursor-pointer"
                      onClick={() => navigate(`/exam/${exam.id}`)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-neutral-light mb-2">
                            {exam.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 text-neutral-light/60">
                              <Calendar className="w-4 h-4" />
                              Vence: {new Date(exam.dueDate).toLocaleDateString('es-ES')}
                            </span>
                            <span className="flex items-center gap-1 text-neutral-light/60">
                              <Clock className="w-4 h-4" />
                              {exam.duration}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium
                              ${exam.difficulty === 'Básico' ? 'bg-status-success/20 text-status-success' :
                                exam.difficulty === 'Intermedio' ? 'bg-status-warning/20 text-status-warning' :
                                'bg-status-error/20 text-status-error'}`}>
                              {exam.difficulty}
                            </span>
                          </div>
                          <div className="mt-2">
                            <span className="text-xs text-neutral-light/50">
                              Intentos: {exam.attempts}/{exam.maxAttempts}
                            </span>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="btn-futuristic py-2 px-6 text-sm"
                        >
                          Iniciar
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {pendingExams.length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-status-success mx-auto mb-4" />
                    <p className="text-neutral-light/60">¡No tienes exámenes pendientes!</p>
                  </div>
                )}
              </motion.div>

              {/* Progress Overview */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-effect rounded-2xl p-6"
              >
                <h2 className="text-2xl font-bold gradient-text-gold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-7 h-7" />
                  Tu Progreso
                </h2>

                <div className="space-y-4">
                  {/* Course Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-neutral-light/80">Módulos Completados</span>
                      <span className="text-lg font-bold text-primary-gold">
                        {stats.coursesCompleted}/{stats.coursesTotal}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-dark rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(stats.coursesCompleted / stats.coursesTotal) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-primary-gold to-accent-purple rounded-full"
                      />
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                    <div className="text-center p-4 bg-neutral-gray/30 rounded-xl">
                      <Award className="w-8 h-8 text-primary-gold mx-auto mb-2" />
                      <p className="text-2xl font-bold text-neutral-light">{stats.certificationsEarned}</p>
                      <p className="text-xs text-neutral-light/60">Certificaciones</p>
                    </div>
                    <div className="text-center p-4 bg-neutral-gray/30 rounded-xl">
                      <Target className="w-8 h-8 text-accent-blue mx-auto mb-2" />
                      <p className="text-2xl font-bold text-neutral-light">{stats.averageScore}%</p>
                      <p className="text-xs text-neutral-light/60">Promedio</p>
                    </div>
                    <div className="text-center p-4 bg-neutral-gray/30 rounded-xl">
                      <Droplets className="w-8 h-8 text-accent-purple mx-auto mb-2" />
                      <p className="text-2xl font-bold text-neutral-light">{stats.oilRecycled}L</p>
                      <p className="text-xs text-neutral-light/60">Aceite Reciclado</p>
                    </div>
                    <div className="text-center p-4 bg-neutral-gray/30 rounded-xl">
                      <Leaf className="w-8 h-8 text-status-success mx-auto mb-2" />
                      <p className="text-2xl font-bold text-neutral-light">A+</p>
                      <p className="text-xs text-neutral-light/60">Eco-Score</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-effect rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold gradient-text-gold mb-4">Acciones Rápidas</h3>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/ova')}
                    className="w-full p-4 rounded-xl bg-primary-gold/20 hover:bg-primary-gold/30 
                             text-primary-gold font-medium transition-all duration-300 
                             flex items-center justify-between group"
                  >
                    <span>Continuar Aprendiendo</span>
                    <BookOpen className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/certificate')}
                    className="w-full p-4 rounded-xl bg-accent-purple/20 hover:bg-accent-purple/30 
                             text-accent-purple font-medium transition-all duration-300 
                             flex items-center justify-between group"
                  >
                    <span>Mis Certificados</span>
                    <Award className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Recent Resources */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-effect rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold gradient-text-gold mb-4">
                  Recursos Recientes
                </h3>
                <div className="space-y-3">
                  {recentResources.map((resource) => (
                    <motion.div
                      key={resource.id}
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between p-3 rounded-lg 
                               bg-neutral-gray/30 hover:bg-neutral-gray/50 
                               transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-primary-gold" />
                        <div>
                          <p className="text-sm font-medium text-neutral-light">
                            {resource.title}
                          </p>
                          <p className="text-xs text-neutral-light/60">{resource.type}</p>
                        </div>
                      </div>
                      {resource.new && (
                        <span className="px-2 py-1 bg-primary-gold/20 text-primary-gold 
                                       text-xs font-medium rounded-full">
                          Nuevo
                        </span>
                      )}
                    </motion.div>
                  ))}
                  <button 
                    onClick={() => navigate('/resources')}
                    className="w-full text-center text-sm text-primary-gold hover:text-primary-goldLight 
                             font-medium mt-2 flex items-center justify-center gap-1"
                  >
                    Ver todos los recursos <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Notification Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-effect rounded-2xl p-6 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Bell className="w-8 h-8 text-primary-gold" />
                  <h3 className="text-lg font-bold text-neutral-light">Notificaciones</h3>
                </div>
                <p className="text-sm text-neutral-light/70 mb-4">
                  Tienes {notifications} notificaciones nuevas
                </p>
                <button className="text-sm text-primary-gold hover:text-primary-goldLight font-medium">
                  Ver todas →
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


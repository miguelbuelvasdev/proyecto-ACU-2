import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home,
  BookOpen,
  FileQuestion,
  BarChart3,
  Bell,
  Menu,
  X,
  Users,
  HelpCircle,
  Settings,
  LogOut,
  User
} from 'lucide-react';
import logoOVA from '../../assets/logoOVA.svg';

const Navbar = () => {
  // Estado del menú móvil y perfil
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeNav, setActiveNav] = useState('inicio');
  const [notifications] = useState(3);

  // Navegación
  const navigate = useNavigate();

  // Datos del usuario (simulados)
  const userData = {
    name: "María González",
    email: "maria@lacocinademaria.com",
    role: "Propietario"
  };

  // Items del menú
  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home, path: '/home' },
    { id: 'recursos', label: 'Recursos', icon: BookOpen, path: '/resources' },
    { id: 'cuestionarios', label: 'Cuestionarios', icon: FileQuestion, path: '/exams' },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/dashboard' }
  ];

  // Items del menú de perfil
  const profileMenuItems = [
    { label: 'Mi Perfil', icon: User, path: '/profile' },
    { label: 'Configuración', icon: Settings, path: '/settings' },
    { label: 'Ayuda', icon: HelpCircle, path: '/help' },
    { label: 'Cerrar Sesión', icon: LogOut, action: 'logout' }
  ];

  // Navegar y cerrar menú
  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  // Función para acciones del perfil
  const handleProfileAction = (item) => {
    if (item.action === 'logout') {
      console.log('Cerrando sesión...');
      navigate('/login');
    } else {
      handleNavigation(item.path);
    }
    setShowProfileMenu(false);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo y Menú Desktop */}
          <div className="flex items-center">
            <button 
              onClick={() => handleNavigation('/home')}
              className="flex items-center text-[#256B3E] hover:text-[#F4A300] transition-colors"
            >
              <img 
                src={logoOVA} 
                alt="EcoAceite OVA Logo" 
                className="w-24 h-12 object-contain"
              />
            </button>
            
            <div className="hidden md:flex space-x-4 ml-10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id);
                    handleNavigation(item.path);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 ${
                    activeNav === item.id
                      ? 'text-[#F4A300] bg-[#FFD439]/10'
                      : 'text-[#256B3E] hover:text-[#F4A300]'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Menú Derecho (Notificaciones y Perfil) */}
          <div className="flex items-center gap-4">
            <button className="p-2 relative text-[#256B3E] hover:text-[#F4A300]">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* Menú de Perfil */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center text-sm rounded-full focus:outline-none"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#FFD439] to-[#F4A300] rounded-full flex items-center justify-center text-white font-bold">
                  {userData.name.charAt(0)}
                </div>
              </button>

              {showProfileMenu && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-[#256B3E]">{userData.name}</p>
                      <p className="text-xs text-[#256B3E]/60">{userData.role}</p>
                    </div>
                    {profileMenuItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleProfileAction(item)}
                        className="flex items-center w-full px-4 py-2 text-sm text-[#256B3E] hover:bg-gray-100"
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Botón Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#256B3E] hover:text-[#F4A300]"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="pt-2 pb-3 px-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  handleNavigation(item.path);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center gap-3 ${
                  activeNav === item.id
                    ? 'bg-[#FFD439]/10 text-[#F4A300]'
                    : 'text-[#256B3E] hover:text-[#F4A300]'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
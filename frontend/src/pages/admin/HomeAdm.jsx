import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Settings, 
  Bell, 
  Lock, 
  Eye, 
  EyeOff,
  Edit3, 
  Save, 
  X, 
  Camera, 
  Upload,
  Download,
  BarChart3,
  Users,
  Building,
  Award,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  FileText,
  Key,
  Globe,
  Smartphone,
  Monitor,
  Trash2,
  Plus,
  RefreshCw
} from 'lucide-react';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Carlos Administrador",
    email: "admin@ecoaceite.com",
    phone: "+57 300 123 4567",
    position: "Administrador Principal",
    department: "Gestión Ambiental",
    location: "Cartagena, Colombia",
    joinDate: "2023-01-15",
    lastLogin: "2024-11-12 14:30",
    avatar: null,
    bio: "Administrador principal del sistema EcoAceite con más de 5 años de experiencia en gestión ambiental y sostenibilidad empresarial."
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReports: true,
    systemAlerts: true,
    maintenanceUpdates: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    loginAlerts: true,
    deviceTracking: true
  });

  // Estadísticas del administrador
  const adminStats = {
    totalRestaurants: 156,
    activeUsers: 134,
    totalCertificates: 89,
    systemUptime: "99.8%",
    monthlyGrowth: 12.5,
    pendingApprovals: 8,
    recentActions: 45,
    systemHealth: "Excelente"
  };

  // Actividad reciente
  const recentActivity = [
    {
      id: 1,
      action: "Aprobó certificación",
      target: "Restaurante El Dorado",
      time: "Hace 2 horas",
      type: "approval",
      icon: <Award className="w-4 h-4" />
    },
    {
      id: 2,
      action: "Actualizó configuración",
      target: "Sistema de notificaciones",
      time: "Hace 4 horas",
      type: "config",
      icon: <Settings className="w-4 h-4" />
    },
    {
      id: 3,
      action: "Generó reporte",
      target: "Indicadores mensuales",
      time: "Hace 6 horas",
      type: "report",
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: 4,
      action: "Registró nuevo usuario",
      target: "Pizzería Don Luigi",
      time: "Hace 1 día",
      type: "user",
      icon: <Users className="w-4 h-4" />
    }
  ];

  // Dispositivos conectados
  const connectedDevices = [
    {
      id: 1,
      device: "MacBook Pro",
      location: "Cartagena, Colombia",
      lastActive: "Activo ahora",
      browser: "Chrome 119.0",
      ip: "192.168.1.100",
      isCurrent: true
    },
    {
      id: 2,
      device: "iPhone 14",
      location: "Cartagena, Colombia",
      lastActive: "Hace 2 horas",
      browser: "Safari Mobile",
      ip: "192.168.1.101",
      isCurrent: false
    },
    {
      id: 3,
      device: "iPad Air",
      location: "Bogotá, Colombia",
      lastActive: "Hace 3 días",
      browser: "Safari",
      ip: "10.0.0.50",
      isCurrent: false
    }
  ];

  const handleProfileUpdate = () => {
    setIsEditing(false);
    // Aquí iría la lógica para actualizar el perfil
    console.log('Perfil actualizado:', profileData);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    // Aquí iría la lógica para cambiar la contraseña
    console.log('Contraseña cambiada');
    setShowPasswordChange(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSecurityChange = (key, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500 font-medium">+{change}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-[#F4A300] text-white shadow-lg' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Perfil de Administrador</h1>
              <p className="text-gray-600 mt-1">Gestiona tu información personal y configuraciones del sistema</p>
            </div>
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Volver al Dashboard</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Restaurantes Activos"
            value={adminStats.totalRestaurants}
            change={adminStats.monthlyGrowth}
            icon={Building}
            color="bg-blue-500"
          />
          <StatCard
            title="Usuarios Activos"
            value={adminStats.activeUsers}
            icon={Users}
            color="bg-green-500"
          />
          <StatCard
            title="Certificados Emitidos"
            value={adminStats.totalCertificates}
            icon={Award}
            color="bg-purple-500"
          />
          <StatCard
            title="Uptime del Sistema"
            value={adminStats.systemUptime}
            icon={Activity}
            color="bg-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-20 h-20 bg-gradient-to-r from-[#FFD439] to-[#F4A300] rounded-full flex items-center justify-center mx-auto mb-3">
                    {profileData.avatar ? (
                      <img src={profileData.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-2xl font-bold text-white">
                        {profileData.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg border border-gray-200">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900">{profileData.name}</h3>
                <p className="text-sm text-gray-500">{profileData.position}</p>
              </div>

              <nav className="space-y-2">
                <TabButton
                  id="profile"
                  label="Información Personal"
                  icon={User}
                  isActive={activeTab === 'profile'}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="security"
                  label="Seguridad"
                  icon={Shield}
                  isActive={activeTab === 'security'}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="notifications"
                  label="Notificaciones"
                  icon={Bell}
                  isActive={activeTab === 'notifications'}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="activity"
                  label="Actividad Reciente"
                  icon={Clock}
                  isActive={activeTab === 'activity'}
                  onClick={setActiveTab}
                />
                <TabButton
                  id="devices"
                  label="Dispositivos"
                  icon={Monitor}
                  isActive={activeTab === 'devices'}
                  onClick={setActiveTab}
                />
              </nav>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <AnimatePresence mode="wait">
                {/* Información Personal */}
                {activeTab === 'profile' && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Información Personal</h2>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center space-x-2 px-4 py-2 bg-[#F4A300] text-white rounded-lg hover:bg-[#FFD439] transition-colors"
                      >
                        {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                        <span>{isEditing ? 'Cancelar' : 'Editar'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profileData.name}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-[#F4A300] outline-none"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{profileData.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-[#F4A300] outline-none"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{profileData.email}</p>
                        )}
                      </div>

                      <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-[#F4A300] outline-none"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{profileData.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={profileData.location}
                            onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-[#F4A300] outline-none"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{profileData.location}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Ingreso</label>
                        <p className="text-gray-900 font-medium">{new Date(profileData.joinDate).toLocaleDateString()}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Último Inicio de Sesión</label>
                        <p className="text-gray-900 font-medium">{profileData.lastLogin}</p>
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Biografía</label>
                        {isEditing ? (
                          <textarea
                            value={profileData.bio}
                            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F4A300] focus:border-[#F4A300] outline-none"
                            rows="3"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{profileData.bio}</p>
                        )}
                      </div>
                    </div>

                    {isEditing && (
                      <div className="mt-6">
                        <button
                          onClick={handleProfileUpdate}
                          className="px-4 py-2 bg-[#F4A300] text-white rounded-lg hover:bg-[#FFD439] transition-colors"
                        >
                          <Save className="w-4 h-4 inline" /> Guardar Cambios
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Seguridad */}
                {activeTab === 'security' && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuración de Seguridad</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Autenticación de Dos Factores</span>
                        <input
                          type="checkbox"
                          checked={securitySettings.twoFactorAuth}
                          onChange={() => handleSecurityChange('twoFactorAuth', !securitySettings.twoFactorAuth)}
                          className="toggle"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Alertas de Inicio de Sesión</span>
                        <input
                          type="checkbox"
                          checked={securitySettings.loginAlerts}
                          onChange={() => handleSecurityChange('loginAlerts', !securitySettings.loginAlerts)}
                          className="toggle"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Seguimiento de Dispositivos</span>
                        <input
                          type="checkbox"
                          checked={securitySettings.deviceTracking}
                          onChange={() => handleSecurityChange('deviceTracking', !securitySettings.deviceTracking)}
                          className="toggle"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Tiempo de Sesión (minutos)</span>
                        <input
                          type="number"
                          value={securitySettings.sessionTimeout}
                          onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                          className="w-16 border border-gray-300 rounded-lg px-2"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Notificaciones */}
                {activeTab === 'notifications' && (
                  <motion.div
                    key="notifications"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuración de Notificaciones</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Notificaciones por Email</span>
                        <input
                          type="checkbox"
                          checked={notifications.emailNotifications}
                          onChange={() => handleNotificationChange('emailNotifications')}
                          className="toggle"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Notificaciones por SMS</span>
                        <input
                          type="checkbox"
                          checked={notifications.smsNotifications}
                          onChange={() => handleNotificationChange('smsNotifications')}
                          className="toggle"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Notificaciones Push</span>
                        <input
                          type="checkbox"
                          checked={notifications.pushNotifications}
                          onChange={() => handleNotificationChange('pushNotifications')}
                          className="toggle"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Reportes Semanales</span>
                        <input
                          type="checkbox"
                          checked={notifications.weeklyReports}
                          onChange={() => handleNotificationChange('weeklyReports')}
                          className="toggle"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Alertas del Sistema</span>
                        <input
                          type="checkbox"
                          checked={notifications.systemAlerts}
                          onChange={() => handleNotificationChange('systemAlerts')}
                          className="toggle"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Actualizaciones de Mantenimiento</span>
                        <input
                          type="checkbox"
                          checked={notifications.maintenanceUpdates}
                          onChange={() => handleNotificationChange('maintenanceUpdates')}
                          className="toggle"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Actividad Reciente */}
                {activeTab === 'activity' && (
                  <motion.div
                    key="activity"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Actividad Reciente</h2>
                    <ul className="space-y-2">
                      {recentActivity.map(activity => (
                        <li key={activity.id} className="flex items-center space-x-2 p-4 bg-gray-100 rounded-lg">
                          {activity.icon}
                          <div>
                            <p className="text-gray-800 font-medium">{activity.action}</p>
                            <p className="text-gray-500 text-sm">{activity.target} - {activity.time}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Dispositivos Conectados */}
                {activeTab === 'devices' && (
                  <motion.div
                    key="devices"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispositivos Conectados</h2>
                    <ul className="space-y-2">
                      {connectedDevices.map(device => (
                        <li key={device.id} className={`flex items-center justify-between p-4 rounded-lg ${device.isCurrent ? 'bg-green-100' : 'bg-gray-100'}`}>
                          <div>
                            <p className="text-gray-800 font-medium">{device.device}</p>
                            <p className="text-gray-500 text-sm">{device.location} - {device.lastActive}</p>
                          </div>
                          <p className="text-gray-500 text-sm">IP: {device.ip}</p>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

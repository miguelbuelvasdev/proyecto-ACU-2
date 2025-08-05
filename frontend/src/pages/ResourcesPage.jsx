import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Book, 
  Video, 
  FileText, 
  X, 
  ArrowRight,
  Clock,
  Eye,
  ChevronRight,
  Play,
  Download,
  GraduationCap,
  Award,
  CheckCircle2,
  BookOpen,
  Layers
} from 'lucide-react';

const MinimalResourcesPage = () => {
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState(1);
  const [mobileUnitsOpen, setMobileUnitsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de las unidades
  const units = [
    {
      id: 1,
      title: "Fundamentos del ACU",
      subtitle: "Introducción y conceptos básicos",
      description: "Conoce los fundamentos del aceite de cocina usado, su composición química y las problemáticas ambientales asociadas.",
      color: "from-blue-500 to-blue-600",
      lightColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      resources: 4,
      duration: "2.5 horas",
      level: "Básico",
      completed: true,
      progress: 100
    },
    {
      id: 2,
      title: "Técnicas de Manejo",
      subtitle: "Métodos y procedimientos seguros",
      description: "Aprende las técnicas correctas para el filtrado, almacenamiento temporal y manipulación segura del ACU.",
      color: "from-emerald-500 to-emerald-600",
      lightColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-700",
      resources: 4,
      duration: "3.0 horas",
      level: "Intermedio",
      completed: true,
      progress: 100
    },
    {
      id: 3,
      title: "Impacto Ambiental",
      subtitle: "Sostenibilidad y reciclaje",
      description: "Comprende el impacto ambiental del ACU y los beneficios de las prácticas de reciclaje y economía circular.",
      color: "from-green-500 to-green-600",
      lightColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
      resources: 3,
      duration: "2.8 horas",
      level: "Intermedio",
      completed: false,
      progress: 60
    },
    {
      id: 4,
      title: "Normativas Legales",
      subtitle: "Marco regulatorio colombiano",
      description: "Estudia las regulaciones nacionales e internacionales, obligaciones legales y procedimientos de cumplimiento.",
      color: "from-amber-500 to-amber-600",
      lightColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-700",
      resources: 3,
      duration: "2.0 horas",
      level: "Avanzado",
      completed: false,
      progress: 0
    }
  ];

  // Recursos por unidad
  const resourcesByUnit = {
    1: [
      {
        id: 1,
        title: "¿Qué es el Aceite de Cocina Usado?",
        description: "Definición técnica, características físico-químicas y problemática del ACU en la industria gastronómica moderna.",
        type: "Guía",
        duration: "15 min",
        views: "2.1K",
        difficulty: "Básico",
        downloadable: true
      },
      {
        id: 2,
        title: "Composición Química del ACU",
        description: "Análisis detallado de los componentes del aceite usado y los cambios durante el proceso de cocción.",
        type: "Guía",
        duration: "12 min",
        views: "1.8K",
        difficulty: "Básico",
        downloadable: false
      },
      {
        id: 3,
        title: "Identificación de Aceite Deteriorado",
        description: "Métodos prácticos para reconocer cuándo el aceite debe ser reemplazado y criterios de calidad.",
        type: "Guía",
        duration: "10 min",
        views: "1.5K",
        difficulty: "Básico",
        downloadable: true
      },
      {
        id: 4,
        title: "Historia del Reciclaje de Aceites",
        description: "Evolución histórica de las prácticas de reciclaje de aceites y su desarrollo en Colombia.",
        type: "Guía",
        duration: "8 min",
        views: "980",
        difficulty: "Básico",
        downloadable: true
      }
    ],
    2: [
      {
        id: 5,
        title: "Técnicas de Filtrado Avanzado",
        description: "Métodos profesionales y equipos especializados para extender la vida útil del aceite de cocina.",
        type: "Guía",
        duration: "18 min",
        views: "3.2K",
        difficulty: "Intermedio",
        downloadable: false
      },
      {
        id: 6,
        title: "Protocolos de Almacenamiento Seguro",
        description: "Procedimientos técnicos para el almacenamiento temporal del ACU en cocinas comerciales e industriales.",
        type: "Guía",
        duration: "12 min",
        views: "2.5K",
        difficulty: "Intermedio",
        downloadable: true
      },
      {
        id: 7,
        title: "Equipos y Herramientas Especializadas",
        description: "Guía completa de equipos profesionales para el manejo, filtrado y almacenamiento del ACU.",
        type: "Guía",
        duration: "20 min",
        views: "1.9K",
        difficulty: "Intermedio",
        downloadable: true
      },
      {
        id: 8,
        title: "Procedimientos de Emergencia",
        description: "Protocolos de seguridad para incidentes con aceite caliente, derrames y situaciones de riesgo.",
        type: "Guía",
        duration: "15 min",
        views: "2.1K",
        difficulty: "Intermedio",
        downloadable: false
      }
    ],
    3: [
      {
        id: 9,
        title: "Impacto del ACU en Ecosistemas Acuáticos",
        description: "Análisis científico de las consecuencias ambientales de la mala gestión del aceite de cocina usado.",
        type: "Guía",
        duration: "20 min",
        views: "1.9K",
        difficulty: "Intermedio",
        downloadable: true
      },
      {
        id: 10,
        title: "Cadena de Reciclaje y Economía Circular",
        description: "Proceso completo de transformación del ACU en biodiesel y otros productos de valor agregado.",
        type: "Guía",
        duration: "15 min",
        views: "2.8K",
        difficulty: "Intermedio",
        downloadable: false
      },
      {
        id: 11,
        title: "Huella de Carbono y Sostenibilidad",
        description: "Cálculo del impacto ambiental y beneficios de las prácticas sostenibles en el manejo del ACU.",
        type: "Guía",
        duration: "18 min",
        views: "1.6K",
        difficulty: "Avanzado",
        downloadable: true
      }
    ],
    4: [
      {
        id: 12,
        title: "Resolución 0316 de 2018 - Análisis Completo",
        description: "Estudio detallado de la normativa colombiana para el manejo del ACU y sus implicaciones legales.",
        type: "Guía",
        duration: "25 min",
        views: "1.7K",
        difficulty: "Avanzado",
        downloadable: true
      },
      {
        id: 13,
        title: "Sanciones y Marco de Cumplimiento",
        description: "Consecuencias legales del incumplimiento normativo y procedimientos de fiscalización ambiental.",
        type: "Artículo",
        duration: "18 min",
        views: "1.3K",
        difficulty: "Avanzado",
        downloadable: true
      },
      {
        id: 14,
        title: "Certificaciones y Auditorías Ambientales",
        description: "Procesos de certificación ambiental y preparación para auditorías de cumplimiento normativo.",
        type: "Video",
        duration: "22 min",
        views: "1.1K",
        difficulty: "Avanzado",
        downloadable: false
      }
    ]
  };

  const currentResources = resourcesByUnit[selectedUnit] || [];
  const filteredResources = currentResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Video':
        return <Video className="w-4 h-4" />;
      case 'Guía':
        return <Book className="w-4 h-4" />;
      case 'Artículo':
        return <FileText className="w-4 h-4" />;
      default:
        return <Book className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Video':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'Guía':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Artículo':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Básico':
        return 'text-green-700 bg-green-100 border-green-200';
      case 'Intermedio':
        return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'Avanzado':
        return 'text-red-700 bg-red-100 border-red-200';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#256B3E] overflow-x-hidden font-['Inter',sans-serif]">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-[#FFD439]/10 to-[#F4A300]/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-l from-[#256B3E]/10 to-[#FCD94B]/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Mobile Units Button - Floating en mejor posición */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setMobileUnitsOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 z-50 p-4 bg-gradient-to-r from-[#256B3E] to-[#1F5D34] text-white rounded-2xl shadow-lg shadow-[#256B3E]/25 hover:shadow-xl hover:shadow-[#256B3E]/40 transition-all duration-300"
      >
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5" />
          <span className="text-sm font-medium">Unidades</span>
        </div>
      </motion.button>

      {/* Container principal con padding top para el navbar */}
      <div className="pt-24">
        <div className="flex">
          {/* Panel lateral de unidades - Desktop */}
          <aside className="hidden lg:block w-96 bg-white border-r border-gray-200 min-h-screen sticky top-24 overflow-y-auto">
            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#256B3E] mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#256B3E] to-[#1F5D34] rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  Unidades de Aprendizaje
                </h2>
                <p className="text-sm text-[#256B3E]/70">
                  Selecciona una unidad para explorar sus recursos educativos
                </p>
              </div>
              
              <div className="space-y-4">
                {units.map((unit) => (
                  <motion.button
                    key={unit.id}
                    onClick={() => setSelectedUnit(unit.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 ${
                      selectedUnit === unit.id
                        ? `${unit.borderColor} ${unit.lightColor} shadow-lg shadow-black/5`
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${unit.color} rounded-xl flex items-center justify-center text-white font-bold shadow-lg relative`}>
                          {unit.completed && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <CheckCircle2 className="w-3 h-3 text-white" />
                            </div>
                          )}
                          {unit.id}
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#256B3E] text-base">{unit.title}</h3>
                          <p className="text-xs text-[#256B3E]/60 font-medium">{unit.subtitle}</p>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-[#256B3E]/40 transition-transform ${
                        selectedUnit === unit.id ? 'rotate-90' : ''
                      }`} />
                    </div>

                    <p className="text-sm text-[#256B3E]/70 mb-4 leading-relaxed">{unit.description}</p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-[#256B3E]/60 mb-1">
                        <span>Progreso</span>
                        <span>{unit.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${unit.progress}%` }}
                          className={`h-2 bg-gradient-to-r ${unit.color} rounded-full`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(unit.level)}`}>
                          {unit.level}
                        </span>
                        <span className="text-[#256B3E]/60">{unit.resources} recursos</span>
                      </div>
                      <span className="text-[#256B3E]/60">{unit.duration}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile Units Sidebar */}
          <AnimatePresence>
            {mobileUnitsOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileUnitsOpen(false)}
                  className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                />
                
                {/* Sidebar */}
                <motion.div
                  initial={{ x: -400 }}
                  animate={{ x: 0 }}
                  exit={{ x: -400 }}
                  className="lg:hidden fixed inset-y-0 left-0 z-50 w-96 bg-white border-r border-gray-200 overflow-y-auto"
                >
                  <div className="p-6 pt-28">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-[#256B3E] flex items-center gap-2">
                        <GraduationCap className="w-6 h-6" />
                        Unidades
                      </h2>
                      <button
                        onClick={() => setMobileUnitsOpen(false)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {units.map((unit) => (
                        <button
                          key={unit.id}
                          onClick={() => {
                            setSelectedUnit(unit.id);
                            setMobileUnitsOpen(false);
                          }}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                            selectedUnit === unit.id
                              ? `${unit.borderColor} ${unit.lightColor}`
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-3 mb-3">
                            <div className={`w-10 h-10 bg-gradient-to-r ${unit.color} rounded-xl flex items-center justify-center text-white font-bold relative`}>
                              {unit.completed && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                  <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                                </div>
                              )}
                              {unit.id}
                            </div>
                            <div>
                              <h3 className="font-semibold text-[#256B3E] text-sm">{unit.title}</h3>
                              <p className="text-xs text-[#256B3E]/60">{unit.subtitle}</p>
                            </div>
                          </div>
                          <p className="text-xs text-[#256B3E]/70 mb-3 leading-relaxed">{unit.description}</p>
                          
                          {/* Progress Bar Mobile */}
                          <div className="mb-3">
                            <div className="flex justify-between text-xs text-[#256B3E]/60 mb-1">
                              <span>Progreso</span>
                              <span>{unit.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className={`h-1.5 bg-gradient-to-r ${unit.color} rounded-full transition-all duration-500`}
                                style={{ width: `${unit.progress}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="flex justify-between text-xs text-[#256B3E]/60">
                            <span className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(unit.level)} text-xs`}>
                              {unit.level}
                            </span>
                            <span>{unit.resources} recursos • {unit.duration}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Contenido principal - Mejor centrado */}
          <main className="flex-1 relative z-10 max-w-6xl mx-auto">
            <div className="p-6 lg:px-8">
              {/* Header de la unidad actual */}
              <div className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${units[selectedUnit - 1]?.color} rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg relative flex-shrink-0`}>
                      {units[selectedUnit - 1]?.completed && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                      {selectedUnit}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h1 className="text-2xl lg:text-3xl font-bold text-[#256B3E] mb-1 break-words">{units[selectedUnit - 1]?.title}</h1>
                      <p className="text-[#256B3E]/70 text-base lg:text-lg mb-2">{units[selectedUnit - 1]?.subtitle}</p>
                      <p className="text-[#256B3E]/60 text-sm leading-relaxed">{units[selectedUnit - 1]?.description}</p>
                    </div>
                  </div>

                  {/* Unit stats */}
                  <div className="flex flex-wrap gap-3 lg:flex-col lg:items-end">
                    <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <Book className="w-4 h-4 text-[#256B3E]" />
                        <span className="text-sm font-medium text-[#256B3E]">
                          {units[selectedUnit - 1]?.resources} recursos
                        </span>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-[#256B3E]" />
                        <span className="text-sm font-medium text-[#256B3E]">
                          {units[selectedUnit - 1]?.duration}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${getDifficultyColor(units[selectedUnit - 1]?.level)}`}>
                        {units[selectedUnit - 1]?.level}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar for current unit */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
                  <div className="flex justify-between text-sm text-[#256B3E] mb-2">
                    <span className="font-medium">Progreso de la unidad</span>
                    <span className="font-bold">{units[selectedUnit - 1]?.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${units[selectedUnit - 1]?.progress}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-3 bg-gradient-to-r ${units[selectedUnit - 1]?.color} rounded-full shadow-sm`}
                    />
                  </div>
                </div>

                {/* Barra de búsqueda */}
                <div className="relative max-w-md">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#256B3E]/50 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar recursos en esta unidad..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F4A300] focus:border-[#F4A300] transition-all duration-300 bg-white shadow-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#256B3E]/50 hover:text-[#256B3E] transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Grid de recursos - Mejor centrado */}
              {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {filteredResources.map((resource, index) => (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-[#F4A300]/30 transition-all duration-300 cursor-pointer group"
                    >
                      {/* Placeholder de imagen */}
                      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                        <img 
                          src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/65545f71-83d5-43ad-8e13-6a3c70e977ee.png" 
                          alt={`Imagen representativa del recurso educativo sobre ${resource.title} - contenido especializado en manejo de aceite de cocina usado con técnicas profesionales y metodologías avanzadas`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        
                        {/* Badges */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getTypeColor(resource.type)}`}>
                            <div className="flex items-center space-x-1">
                              {getTypeIcon(resource.type)}
                              <span>{resource.type}</span>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getDifficultyColor(resource.difficulty)}`}>
                            {resource.difficulty}
                          </div>
                        </div>

                        {/* Play button para videos */}
                        {resource.type === 'Video' && (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20">
                              <Play className="w-6 h-6 text-[#256B3E] ml-1" />
                            </div>
                          </motion.div>
                        )}

                        {/* Download icon para recursos descargables */}
                        {resource.downloadable && (
                          <div className="absolute top-4 left-4">
                            <div className="w-8 h-8 bg-green-500/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                              <Download className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Contenido */}
                      <div className="p-6">
                        <h3 className="font-bold text-[#256B3E] text-lg mb-3 line-clamp-2 group-hover:text-[#256B3E]/80 transition-colors leading-tight">
                          {resource.title}
                        </h3>
                        <p className="text-[#256B3E]/70 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {resource.description}
                        </p>

                        {/* Metadatos */}
                        <div className="flex items-center justify-between text-xs text-[#256B3E]/60 mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-md">
                              <Clock className="w-3 h-3" />
                              <span>{resource.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-md">
                              <Eye className="w-3 h-3" />
                              <span>{resource.views}</span>
                            </div>
                          </div>
                        </div>

                        {/* CTA */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-2 text-[#F4A300] font-medium text-sm">
                            <span>
                              {resource.type === 'Video' ? 'Ver contenido' :
                               resource.type === 'Guía' ? 'Leer guía' : 'Leer artículo'}
                            </span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                          {resource.downloadable && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 rounded-lg bg-gray-50 hover:bg-[#F4A300] hover:text-white transition-all duration-200"
                            >
                              <Download className="w-4 h-4" />
                            </motion.button>
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* Estado vacío */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-gray-100 border border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Search className="w-12 h-12 text-[#256B3E]/30" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#256B3E]/70 mb-2">
                    No se encontraron recursos
                  </h3>
                  <p className="text-[#256B3E]/50 mb-6 max-w-md mx-auto">
                    {searchTerm 
                      ? `No hay recursos que coincidan con "${searchTerm}" en esta unidad.`
                      : 'Esta unidad aún no tiene recursos disponibles.'
                    }
                  </p>
                  {searchTerm && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSearchTerm('')}
                      className="px-6 py-3 bg-gradient-to-r from-[#FFD439] to-[#F4A300] text-white rounded-xl font-medium shadow-lg shadow-[#FFD439]/25 hover:shadow-xl hover:shadow-[#FFD439]/40 transition-all duration-300"
                    >
                      Ver todos los recursos
                    </motion.button>
                  )}
                </motion.div>
              )}

              {/* Unit completion CTA */}
              {units[selectedUnit - 1]?.progress === 100 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12"
                >
                  <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 text-center overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-4 right-4 w-24 h-24 bg-green-500 rounded-full"></div>
                      <div className="absolute bottom-4 left-4 w-16 h-16 bg-emerald-500 rounded-full"></div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-green-800 mb-2">
                        ¡Unidad Completada!
                      </h3>
                      <p className="text-green-700 mb-6">
                        Has completado exitosamente todos los recursos de esta unidad.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/exams')}
                        className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Realizar Evaluación
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MinimalResourcesPage;


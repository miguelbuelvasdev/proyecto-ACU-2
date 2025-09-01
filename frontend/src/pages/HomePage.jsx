import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  FileQuestion,
  Award,
  Clock,
  CheckCircle,
  TrendingUp,
  Calendar,
  ChevronRight,
  Droplets,
  Leaf,
  Target,
  Bell,
  Shield,
} from "lucide-react";

const HomePage = () => {
  //States
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Mock data para exámenes y estadísticas
  const pendingExams = [
    {
      id: 1,
      title: "Cuestionario Final de Certificación",
      dueDate: "2025-08-20",
      duration: "60 min",
      attempts: 0,
      maxAttempts: 3,
      difficulty: "Intermedio",
    },
    {
      id: 2,
      title: "Cuestionario Inicial de Conocimientos",
      dueDate: "2025-08-20",
      duration: "60 min",
      attempts: 0,
      maxAttempts: 3,
      difficulty: "Básico",
    },
  ];

  const stats = {
    coursesCompleted: 0,
    coursesTotal: 0,
    averageScore: 0,
    certificationsEarned: 0,
    oilRecycled: 0,
  };

  const recentResources = [
    {
      id: 1,
      title: "Guía: Almacenamiento Seguro del Aceite",
      type: "PDF",
      new: true,
    },
    {
      id: 2,
      title: "Video: Proceso de Filtrado",
      type: "Video",
      new: true,
    },
    {
      id: 3,
      title: "Infografía: Impacto Ambiental",
      type: "Imagen",
      new: false,
    },
  ];

  //*Fetches
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/user/${userId}`);
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        setUserData(null);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#256B3E] overflow-x-hidden font-['Inter',sans-serif]">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-[#FFD439]/10 to-[#F4A300]/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-l from-[#256B3E]/10 to-[#FCD94B]/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-[#F4A300]/5 to-[#FFD439]/5 rounded-full filter blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-12 pb-12">
        <div className="container px-4 mx-auto sm:px-6">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center lg:text-left"
          >
            {/* Educational Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-gray-200 rounded-full bg-gradient-to-r from-gray-100 to-gray-50"
            >
              <BookOpen className="w-4 h-4 text-[#F4A300]" />
              <span className="text-sm font-medium text-[#256B3E]">
                Panel de Control
              </span>
              <div className="w-2 h-2 bg-[#FFD439] rounded-full animate-pulse"></div>
            </motion.div>

            <h1 className="mb-4 text-4xl font-bold leading-tight lg:text-5xl">
              <span className="block text-[#256B3E] mb-2">Bienvenido,</span>
              <span className="block bg-gradient-to-r from-[#F4A300] via-[#FFD439] to-[#256B3E] bg-clip-text text-transparent">
                {userData ? userData.name : "Usuario"}
              </span>
            </h1>
            <p className="text-xl text-[#256B3E]/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Continúa tu viaje hacia la sostenibilidad gastronómica y el manejo
              responsable del ACU
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Main Content */}
            <div className="space-y-8 lg:col-span-2">
              {/* Pending Exams */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-8 bg-white border border-gray-200 shadow-lg rounded-2xl shadow-black/5"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-[#256B3E] flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FFD439] to-[#F4A300] rounded-xl flex items-center justify-center">
                      <FileQuestion className="w-6 h-6 text-white" />
                    </div>
                    Exámenes Pendientes
                  </h2>
                  <span className="text-sm text-[#256B3E]/60 bg-gray-100 px-3 py-1 rounded-full font-medium">
                    {pendingExams.length} por completar
                  </span>
                </div>

                <div className="space-y-6">
                  {pendingExams.map((exam) => (
                    <motion.div
                      key={exam.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-50/80 rounded-xl p-6 border border-gray-200 
                               hover:border-[#F4A300]/50 hover:shadow-lg hover:shadow-[#F4A300]/10 
                               transition-all duration-300 cursor-pointer group"
                      onClick={() => navigate(`/exam/${exam.id}`)}
                    >
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#256B3E] mb-3 group-hover:text-[#256B3E]/90">
                            {exam.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 mb-3 text-sm">
                            <span className="flex items-center gap-2 text-[#256B3E]/60">
                              <Calendar className="w-4 h-4" />
                              Vence:{" "}
                              {new Date(exam.dueDate).toLocaleDateString(
                                "es-ES"
                              )}
                            </span>
                            <span className="flex items-center gap-2 text-[#256B3E]/60">
                              <Clock className="w-4 h-4" />
                              {exam.duration}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium
                              ${
                                exam.difficulty === "Básico"
                                  ? "bg-green-100 text-green-700 border border-green-200"
                                  : exam.difficulty === "Intermedio"
                                  ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                                  : "bg-red-100 text-red-700 border border-red-200"
                              }`}
                            >
                              {exam.difficulty}
                            </span>
                          </div>
                          <div>
                            <span className="text-xs text-[#256B3E]/50 bg-white px-2 py-1 rounded-md border">
                              Intentos: {exam.attempts}/{exam.maxAttempts}
                            </span>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 bg-gradient-to-r from-[#FFD439] to-[#F4A300] text-white rounded-xl font-medium shadow-lg shadow-[#FFD439]/25 hover:shadow-xl hover:shadow-[#FFD439]/40 transition-all duration-300"
                        >
                          Iniciar
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {pendingExams.length === 0 && (
                  <div className="py-12 text-center">
                    <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 border border-green-200 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <p className="text-[#256B3E]/60 font-medium">
                      ¡No tienes exámenes pendientes!
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Progress Overview */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-8 bg-white border border-gray-200 shadow-lg rounded-2xl shadow-black/5"
              >
                <h2 className="text-2xl font-bold text-[#256B3E] mb-8 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#256B3E] to-[#1F5D34] rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  Tu Progreso
                </h2>

                <div className="space-y-6">
                  {/* Course Progress */}
                  <div className="p-6 border border-gray-200 bg-gray-50/80 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[#256B3E] font-medium">
                        Módulos Completados
                      </span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-[#F4A300] to-[#256B3E] bg-clip-text text-transparent">
                        {stats.coursesCompleted}/{stats.coursesTotal}
                      </span>
                    </div>
                    <div className="w-full h-4 overflow-hidden bg-gray-200 border border-gray-300 rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            (stats.coursesCompleted / stats.coursesTotal) * 100
                          }%`,
                        }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-[#FFD439] to-[#F4A300] rounded-full shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="text-center p-6 bg-gray-50/80 rounded-xl border border-gray-200 hover:border-[#F4A300]/50 transition-all duration-300 group">
                      <Award className="w-10 h-10 text-[#F4A300] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <p className="text-2xl font-bold text-[#256B3E] mb-1">
                        {stats.certificationsEarned}
                      </p>
                      <p className="text-xs text-[#256B3E]/60 font-medium">
                        Certificaciones
                      </p>
                    </div>
                    <div className="text-center p-6 bg-gray-50/80 rounded-xl border border-gray-200 hover:border-[#F4A300]/50 transition-all duration-300 group">
                      <Target className="w-10 h-10 text-[#256B3E] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <p className="text-2xl font-bold text-[#256B3E] mb-1">
                        {stats.averageScore}%
                      </p>
                      <p className="text-xs text-[#256B3E]/60 font-medium">
                        Promedio
                      </p>
                    </div>
                    <div className="text-center p-6 bg-gray-50/80 rounded-xl border border-gray-200 hover:border-[#F4A300]/50 transition-all duration-300 group">
                      <Droplets className="w-10 h-10 text-[#F4A300] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <p className="text-2xl font-bold text-[#256B3E] mb-1">
                        {stats.oilRecycled}L
                      </p>
                      <p className="text-xs text-[#256B3E]/60 font-medium">
                        Aceite Reciclado
                      </p>
                    </div>
                    <div className="text-center p-6 bg-gray-50/80 rounded-xl border border-gray-200 hover:border-[#F4A300]/50 transition-all duration-300 group">
                      <Leaf className="w-10 h-10 mx-auto mb-3 text-green-600 transition-transform group-hover:scale-110" />
                      <p className="text-2xl font-bold text-[#256B3E] mb-1">
                        A+
                      </p>
                      <p className="text-xs text-[#256B3E]/60 font-medium">
                        Eco-Score
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl shadow-black/5"
              >
                <h3 className="text-xl font-bold text-[#256B3E] mb-6 flex items-center gap-2">
                  <div className="w-2 h-8 bg-gradient-to-b from-[#FFD439] to-[#F4A300] rounded-full"></div>
                  Acciones Rápidas
                </h3>
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/resources")}
                    className="w-full p-4 rounded-xl bg-gradient-to-r from-[#FFD439]/20 to-[#F4A300]/20 
                             hover:from-[#FFD439]/30 hover:to-[#F4A300]/30 border border-[#F4A300]/20
                             text-[#256B3E] font-medium transition-all duration-300 
                             flex items-center justify-between group"
                  >
                    <span>Continuar Aprendiendo</span>
                    <BookOpen className="w-5 h-5 text-[#F4A300] group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/certificate")}
                    className="w-full p-4 rounded-xl bg-gradient-to-r from-[#256B3E]/20 to-[#1F5D34]/20 
                             hover:from-[#256B3E]/30 hover:to-[#1F5D34]/30 border border-[#256B3E]/20
                             text-[#256B3E] font-medium transition-all duration-300 
                             flex items-center justify-between group"
                  >
                    <span>Mis Certificados</span>
                    <Award className="w-5 h-5 text-[#256B3E] group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Recent Resources */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl shadow-black/5"
              >
                <h3 className="text-xl font-bold text-[#256B3E] mb-6 flex items-center gap-2">
                  <div className="w-2 h-8 bg-gradient-to-b from-[#FFD439] to-[#F4A300] rounded-full"></div>
                  Recursos Recientes
                </h3>
                <div className="space-y-4">
                  {recentResources.map((resource) => (
                    <motion.div
                      key={resource.id}
                      whileHover={{ x: 5, scale: 1.02 }}
                      className="flex items-center justify-between p-4 rounded-xl 
                               bg-gray-50/80 hover:bg-gray-100/80 border border-gray-200
                               hover:border-[#F4A300]/50 transition-all duration-200 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#FFD439] to-[#F4A300] rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#256B3E] group-hover:text-[#256B3E]/90">
                            {resource.title}
                          </p>
                          <p className="text-xs text-[#256B3E]/60">
                            {resource.type}
                          </p>
                        </div>
                      </div>
                      {resource.new && (
                        <span
                          className="px-2 py-1 bg-gradient-to-r from-[#FFD439] to-[#F4A300] text-white 
                                       text-xs font-medium rounded-full shadow-sm"
                        >
                          Nuevo
                        </span>
                      )}
                    </motion.div>
                  ))}
                  <motion.button
                    onClick={() => navigate("/resources")}
                    whileHover={{ scale: 1.02 }}
                    className="w-full text-center text-sm text-[#F4A300] hover:text-[#256B3E] 
                             font-medium mt-4 flex items-center justify-center gap-2 p-2 rounded-lg
                             hover:bg-gray-50 transition-all duration-200"
                  >
                    Ver todos los recursos
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Notification Panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative bg-gradient-to-br from-[#256B3E] to-[#1F5D34] rounded-2xl p-6 text-white overflow-hidden shadow-lg shadow-[#256B3E]/25"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute w-16 h-16 bg-white rounded-full top-6 right-6"></div>
                  <div className="absolute bottom-6 left-6 w-12 h-12 bg-[#FFD439] rounded-full"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl">
                      <Bell className="w-6 h-6 text-[#FFD439]" />
                    </div>
                    <h3 className="text-lg font-bold">Notificaciones</h3>
                  </div>
                  <p className="mb-6 text-sm leading-relaxed text-white/90">
                    Tienes 3 notificaciones nuevas relacionadas con tus cursos y
                    certificaciones
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-[#FFD439] hover:text-white font-medium bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    Ver todas las notificaciones →
                  </motion.button>
                </div>
              </motion.div>

              {/* Environmental Impact Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-6 border border-green-200 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-green-500/5"
              >
                <div className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 shadow-lg bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-green-500/25">
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-green-800">
                    Impacto Ambiental
                  </h3>
                  <p className="mb-4 text-sm text-green-700/80">
                    Tu contribución al medio ambiente este mes
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-green-700">
                        ACU Gestionado
                      </span>
                      <span className="text-sm font-bold text-green-800">
                        {stats.oilRecycled}L
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-green-700">
                        CO₂ Evitado
                      </span>
                      <span className="text-sm font-bold text-green-800">
                        0kg
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-16"
          >
            <div className="relative bg-gradient-to-br from-[#256B3E] to-[#1F5D34] rounded-3xl p-12 text-center text-white overflow-hidden shadow-xl shadow-[#256B3E]/25">
              {/* Background Effects */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute w-32 h-32 bg-white rounded-full top-6 right-6"></div>
                <div className="absolute bottom-6 left-6 w-24 h-24 bg-[#FFD439] rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#F4A300] rounded-full"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-white/10 backdrop-blur-sm rounded-2xl">
                  <Shield className="w-10 h-10 text-[#FFD439]" />
                </div>
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                  ¡Sigue Aprendiendo Sobre ACU!
                </h2>
                <p className="max-w-2xl mx-auto mb-8 text-xl leading-relaxed text-white/90">
                  Continúa desarrollando tus habilidades en el manejo seguro y
                  responsable del Aceite de Cocina Usado
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <motion.button
                    onClick={() => navigate("/resources")}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(255, 212, 57, 0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-[#FFD439] to-[#F4A300] text-[#256B3E] rounded-2xl font-bold text-lg shadow-xl shadow-[#FFD439]/25 hover:shadow-2xl hover:shadow-[#FFD439]/40 transition-all duration-300"
                  >
                    Explorar Módulos
                  </motion.button>
                  <motion.button
                    onClick={() => navigate("/dashboard")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 text-lg font-bold text-white transition-all duration-300 border-2 border-white/20 hover:bg-white/10 rounded-2xl"
                  >
                    Ver Mi Progreso
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

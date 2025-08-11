import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileQuestion,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  Trophy,
  Target,
  Brain,
  ArrowRight,
  BookOpen,
  Award,
  Star,
  ChevronRight,
  Calendar,
  Users
} from 'lucide-react';

const ExamsPage = () => {
  const navigate = useNavigate();

  // Datos de los cuestionarios
  const exams = [
    {
      id: 1,
      type: 'inicial',
      title: 'Cuestionario Inicial de Conocimientos',
      subtitle: 'Evaluación diagnóstica',
      description: 'Evalúa tus conocimientos previos sobre el manejo del Aceite de Cocina Usado (ACU) antes de comenzar el curso.',
      questions: 25,
      duration: '60 min',
      difficulty: 'Básico',
      attempts: 0,
      maxAttempts: 3,
      completed: false,
      score: null,
      status: 'available',
      color: 'from-blue-500 to-blue-600',
      lightColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      icon: Brain,
      benefits: [
        'Identifica tu nivel actual de conocimiento',
        'Personaliza tu experiencia de aprendizaje',
        'Sin calificación mínima requerida'
      ],
      dueDate: '2025-08-20'
    },
    {
      id: 2,
      type: 'final',
      title: 'Cuestionario Final de Certificación',
      subtitle: 'Evaluación certificativa',
      description: 'Demuestra tu dominio completo de los conceptos, técnicas y normativas del manejo responsable del ACU.',
      questions: 25,
      duration: '60 min',
      difficulty: 'Intermedio',
      attempts: 0,
      maxAttempts: 2,
      completed: false,
      score: null,
      status: 'locked', // locked, available, completed
      color: 'from-emerald-500 to-emerald-600',
      lightColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      icon: Trophy,
      benefits: [
        'Obtén tu certificación oficial',
        'Calificación mínima: 80%',
        'Acceso a beneficios exclusivos'
      ],
      dueDate: '2025-08-20',
      requirements: 'Completar todas las unidades del curso'
    }
  ];

  // Estadísticas generales
  const stats = {
    totalQuestions: exams.reduce((acc, exam) => acc + exam.questions, 0),
    completedExams: exams.filter(exam => exam.completed).length,
    averageScore: exams.filter(exam => exam.score).reduce((acc, exam, _, arr) => acc + exam.score / arr.length, 0) || 0
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-green-700 bg-green-100 border-green-200';
      case 'locked':
        return 'text-gray-700 bg-gray-100 border-gray-200';
      case 'completed':
        return 'text-blue-700 bg-blue-100 border-blue-200';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'locked':
        return 'Bloqueado';
      case 'completed':
        return 'Completado';
      default:
        return 'No disponible';
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

  const handleStartExam = (exam) => {
    if (exam.status === 'available') {
      // Navegación específica según el tipo de examen
      if (exam.type === 'inicial') {
        navigate('/initial-exam');
      } else if (exam.type === 'final') {
        navigate('/final-exam');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#256B3E] overflow-x-hidden font-['Inter',sans-serif]">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-[#FFD439]/10 to-[#F4A300]/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-l from-[#256B3E]/10 to-[#FCD94B]/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-[#F4A300]/5 to-[#FFD439]/5 rounded-full filter blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Container principal */}
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 rounded-full px-4 py-2 mb-6">
              <FileQuestion className="w-4 h-4 text-[#F4A300]" />
              <span className="text-sm font-medium text-[#256B3E]">Evaluaciones</span>
              <div className="w-2 h-2 bg-[#FFD439] rounded-full animate-pulse"></div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              <span className="block text-[#256B3E] mb-2">Sistema de</span>
              <span className="block bg-gradient-to-r from-[#F4A300] via-[#FFD439] to-[#256B3E] bg-clip-text text-transparent">
                Evaluación ACU
              </span>
            </h1>
            <p className="text-xl text-[#256B3E]/80 max-w-2xl mx-auto leading-relaxed">
              Demuestra tu conocimiento sobre el manejo responsable del Aceite de Cocina Usado
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FFD439] to-[#F4A300] rounded-xl flex items-center justify-center mx-auto mb-3">
                <FileQuestion className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-[#256B3E] mb-1">{stats.totalQuestions}</div>
              <div className="text-sm text-[#256B3E]/60">Preguntas Totales</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-[#256B3E] to-[#1F5D34] rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-[#256B3E] mb-1">{stats.completedExams}/2</div>
              <div className="text-sm text-[#256B3E]/60">Exámenes Completados</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-[#256B3E] mb-1">{Math.round(stats.averageScore)}%</div>
              <div className="text-sm text-[#256B3E]/60">Promedio General</div>
            </div>
          </motion.div>

          {/* Exams Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
            {exams.map((exam, index) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                className={`bg-white rounded-2xl border-2 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                  exam.status === 'available' ? 'border-gray-200 hover:border-[#F4A300]/50' : 
                  exam.status === 'completed' ? exam.borderColor : 'border-gray-200'
                }`}
              >
                {/* Header del examen */}
                <div className={`relative p-6 bg-gradient-to-r ${exam.color} text-white overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-full"></div>
                  </div>
                  
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <exam.icon className="w-6 h-6" />
                        <span className="text-sm font-medium opacity-90">
                          {exam.type === 'inicial' ? 'Evaluación Inicial' : 'Evaluación Final'}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-1">{exam.title}</h3>
                      <p className="text-sm opacity-90">{exam.subtitle}</p>
                    </div>
                    
                    {exam.completed && (
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Contenido del examen */}
                <div className="p-6">
                  <p className="text-[#256B3E]/70 text-sm mb-6 leading-relaxed">
                    {exam.description}
                  </p>

                  {/* Información del examen */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-[#256B3E]/60">
                      <FileQuestion className="w-4 h-4" />
                      <span>{exam.questions} preguntas</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#256B3E]/60">
                      <Clock className="w-4 h-4" />
                      <span>{exam.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#256B3E]/60">
                      <Target className="w-4 h-4" />
                      <span>{exam.attempts}/{exam.maxAttempts} intentos</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#256B3E]/60">
                      <Calendar className="w-4 h-4" />
                      <span>Hasta {new Date(exam.dueDate).toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(exam.difficulty)}`}>
                      {exam.difficulty}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(exam.status)}`}>
                      {getStatusText(exam.status)}
                    </span>
                    {exam.score && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#FFD439] text-[#256B3E] border border-[#F4A300]">
                        Puntuación: {exam.score}%
                      </span>
                    )}
                  </div>

                  {/* Beneficios */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#256B3E] mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Beneficios
                    </h4>
                    <ul className="space-y-2">
                      {exam.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[#256B3E]/70">
                          <div className="w-1.5 h-1.5 bg-[#F4A300] rounded-full mt-2 flex-shrink-0"></div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requisitos (solo para examen final) */}
                  {exam.requirements && (
                    <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-yellow-800">Requisito</div>
                          <div className="text-sm text-yellow-700">{exam.requirements}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Botón de acción */}
                  <motion.button
                    whileHover={{ scale: exam.status === 'available' ? 1.02 : 1 }}
                    whileTap={{ scale: exam.status === 'available' ? 0.98 : 1 }}
                    onClick={() => handleStartExam(exam)}
                    disabled={exam.status === 'locked'}
                    className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                      exam.status === 'available'
                        ? 'bg-gradient-to-r from-[#FFD439] to-[#F4A300] text-[#256B3E] hover:shadow-lg hover:shadow-[#FFD439]/25'
                        : exam.status === 'completed'
                        ? `bg-gradient-to-r ${exam.color} text-white`
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {exam.status === 'available' && <PlayCircle className="w-5 h-5" />}
                    {exam.status === 'completed' && <CheckCircle2 className="w-5 h-5" />}
                    {exam.status === 'locked' && <AlertCircle className="w-5 h-5" />}
                    
                    <span>
                      {exam.status === 'available' 
                        ? exam.attempts > 0 ? 'Continuar Examen' : 'Iniciar Examen'
                        : exam.status === 'completed'
                        ? 'Ver Resultados'
                        : 'Bloqueado'
                      }
                    </span>
                    
                    {exam.status === 'available' && <ArrowRight className="w-4 h-4" />}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Información adicional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#256B3E] to-[#1F5D34] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#256B3E] mb-2">
              Guía para Evaluaciones
            </h3>
            <p className="text-[#256B3E]/70 mb-6 max-w-2xl mx-auto">
              Cada evaluación está diseñada para medir tu comprensión y aplicación práctica de los conceptos del manejo del ACU. 
              Asegúrate de revisar todos los materiales antes de comenzar.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-[#256B3E] mb-1">Preparación</h4>
                <p className="text-sm text-[#256B3E]/70">Estudia los materiales del curso</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-[#256B3E] mb-1">Tiempo</h4>
                <p className="text-sm text-[#256B3E]/70">Administra bien tu tiempo</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-[#256B3E] mb-1">Certificación</h4>
                <p className="text-sm text-[#256B3E]/70">Obtén tu certificado oficial</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExamsPage;
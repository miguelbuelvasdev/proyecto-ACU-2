import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
  Users,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

const examVisuals = {
  inicial: {
    color: "from-blue-500 to-blue-600",
    lightColor: "bg-blue-50",
    borderColor: "border-blue-200",
    icon: Brain,
  },
  final: {
    color: "from-emerald-500 to-emerald-600",
    lightColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    icon: Trophy,
  },
};

const ExamsPage = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [initialCompleted, setInitialCompleted] = useState(false);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    fetch(`${API_BASE_URL}/educational-modules`)
      .then((res) => res.json())
      .then((data) => {
        setExams(
          data.map((exam) => ({
            ...exam,
            questions: exam.number_questions,
            attempts: 0,
            maxAttempts: exam.type === "inicial" ? 3 : 2,
            completed: false,
            score: null,
            status: exam.type === "inicial" ? "available" : "locked",
            ...examVisuals[exam.type],
          }))
        );
      });
  }, []);

  useEffect(() => {
    if (!userId) return;
    fetch(`${API_BASE_URL}/quiz-result/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserResults(data);
      });
    // Consulta si el inicial está completado para habilitar el final
    fetch(`${API_BASE_URL}/quiz-result/completed-initial/${userId}`)
      .then((res) => res.json())
      .then((data) => setInitialCompleted(data.completed));
  }, [userId]);

  // Relaciona los resultados con los exámenes y controla el estado del final
  const examsWithResults = exams.map((exam) => {
    // Busca resultado por module_id (id del examen)
    const result = userResults.find((r) => r.module?.id === exam.id);

    if (result) {
      return {
        ...exam,
        completed: true,
        status: "completed",
        score: result.score,
      };
    }

    // Si es el final y el inicial no está completado, bloquear
    if (exam.type === "final" && !initialCompleted) {
      return {
        ...exam,
        status: "locked",
      };
    }

    // Si es el final y el inicial está completado, habilitar
    if (exam.type === "final" && initialCompleted) {
      return {
        ...exam,
        status: "available",
      };
    }

    return exam;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "text-green-700 bg-green-100 border-green-200";
      case "locked":
        return "text-gray-700 bg-gray-100 border-gray-200";
      case "completed":
        return "text-blue-700 bg-blue-100 border-blue-200";
      default:
        return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "available":
        return "Disponible";
      case "locked":
        return "Bloqueado";
      case "completed":
        return "Completado";
      default:
        return "No disponible";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Básico":
        return "text-green-700 bg-green-100 border-green-200";
      case "Intermedio":
        return "text-yellow-700 bg-yellow-100 border-yellow-200";
      case "Avanzado":
        return "text-red-700 bg-red-100 border-red-200";
      default:
        return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  const handleStartExam = (exam) => {
    if (exam.status === "available") {
      // Navegación específica según el tipo de examen, enviando id y title como parámetros
      navigate(`/exam_form/${exam.id}/${exam.type}`);
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
        <div className="container px-4 mx-auto sm:px-6 max-w-7xl">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-gray-200 rounded-full bg-gradient-to-r from-gray-100 to-gray-50">
              <FileQuestion className="w-4 h-4 text-[#F4A300]" />
              <span className="text-sm font-medium text-[#256B3E]">
                Cuestionarios
              </span>
              <div className="w-2 h-2 bg-[#FFD439] rounded-full animate-pulse"></div>
            </div>

            <h1 className="mb-4 text-4xl font-bold leading-tight lg:text-5xl">
              <span className="block text-[#256B3E] mb-2">Cuestionario de</span>
              <span className="block bg-gradient-to-r from-[#F4A300] via-[#FFD439] to-[#256B3E] bg-clip-text text-transparent">
                Grasas y ACU
              </span>
            </h1>
            <p className="text-xl text-[#256B3E]/80 max-w-2xl mx-auto leading-relaxed">
              Demuestra tu conocimiento por gestión sobre el manejo responsable
              de grasas y aceites de cocina usado
            </p>
          </motion.div>

          {/* Exams Grid */}
          <div className="grid grid-cols-1 gap-8 mb-12 xl:grid-cols-2">
            {examsWithResults.map((exam, index) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                className={`bg-white rounded-2xl border-2 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                  exam.status === "available"
                    ? "border-gray-200 hover:border-[#F4A300]/50"
                    : exam.status === "completed"
                    ? exam.borderColor
                    : "border-gray-200"
                }`}
              >
                {/* Header del examen */}
                <div
                  className={`relative p-6 bg-gradient-to-r ${exam.color} text-white overflow-hidden`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute w-16 h-16 bg-white rounded-full top-4 right-4"></div>
                    <div className="absolute w-12 h-12 bg-white rounded-full bottom-4 left-4"></div>
                  </div>

                  <div className="relative z-10 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <exam.icon className="w-6 h-6" />
                        <span className="text-sm font-medium opacity-90">
                          {exam.type === "inicial"
                            ? "Cuestionario Inicial"
                            : "Cuestionario Final"}
                        </span>
                      </div>
                      <h3 className="mb-1 text-xl font-bold">{exam.title}</h3>
                      <p className="text-sm opacity-90">{exam.subtitle}</p>
                    </div>

                    {exam.completed && (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm">
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
                      <span>
                        {exam.attempts}/{exam.maxAttempts} intentos
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#256B3E]/60">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Hasta{" "}
                        {new Date(exam.dueDate).toLocaleDateString("es-ES")}
                      </span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        exam.status
                      )}`}
                    >
                      {getStatusText(exam.status)}
                    </span>
                    {exam.score && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#FFD439] text-[#256B3E] border border-[#F4A300]">
                        Puntuación: {exam.score}
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
                      {exam.benefits &&
                        exam.benefits.map((benefit, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-[#256B3E]/70"
                          >
                            <div className="w-1.5 h-1.5 bg-[#F4A300] rounded-full mt-2 flex-shrink-0"></div>
                            <span>{benefit}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Requisitos (solo para examen final) */}
                  {exam.requirements && (
                    <div className="p-3 mb-6 border border-yellow-200 rounded-lg bg-yellow-50">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-yellow-800">
                            Requisito
                          </div>
                          <div className="text-sm text-yellow-700">
                            {exam.requirements}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Botón de acción */}
                  <motion.button
                    whileHover={{
                      scale: exam.status === "available" ? 1.02 : 1,
                    }}
                    whileTap={{ scale: exam.status === "available" ? 0.98 : 1 }}
                    onClick={() => handleStartExam(exam)}
                    disabled={exam.status !== "available"}
                    className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                      exam.status === "available"
                        ? "bg-gradient-to-r from-[#FFD439] to-[#F4A300] text-[#256B3E] hover:shadow-lg hover:shadow-[#FFD439]/25"
                        : exam.status === "completed"
                        ? `bg-gradient-to-r ${exam.color} text-white cursor-not-allowed`
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {exam.status === "available" && (
                      <PlayCircle className="w-5 h-5" />
                    )}
                    {exam.status === "completed" && (
                      <CheckCircle2 className="w-5 h-5" />
                    )}
                    {exam.status === "locked" && (
                      <AlertCircle className="w-5 h-5" />
                    )}

                    <span>
                      {exam.status === "available"
                        ? exam.attempts > 0
                          ? "Continuar Examen"
                          : "Iniciar Examen"
                        : exam.status === "completed"
                        ? "Completado"
                        : "Bloqueado"}
                    </span>

                    {exam.status === "available" && (
                      <ArrowRight className="w-4 h-4" />
                    )}
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
            className="p-8 text-center border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#256B3E] to-[#1F5D34] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#256B3E] mb-2">
              Guía para Cuestionarios
            </h3>
            <p className="text-[#256B3E]/70 mb-6 max-w-2xl mx-auto">
              Cada cuestionario está diseñado para medir tu comprensión y
              aplicación práctica de los conceptos del manejo de las grasas y el
              ACU. Asegúrate de revisar todos los materiales antes de comenzar.
            </p>

            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-xl">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-[#256B3E] mb-1">
                  Preparación
                </h4>
                <p className="text-sm text-[#256B3E]/70">
                  Estudia los materiales del curso
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-yellow-100 rounded-xl">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-[#256B3E] mb-1">Tiempo</h4>
                <p className="text-sm text-[#256B3E]/70">
                  Administra bien tu tiempo
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExamsPage;

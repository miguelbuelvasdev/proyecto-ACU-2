import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  ArrowLeft, 
  ArrowRight,
  Flag,
  RotateCcw,
  Send,
  BookOpen,
  Award,
  Target,
  Timer,
  HelpCircle,
  BarChart3,
  TrendingUp,
  Star,
  Shield,
  Droplets,
  Thermometer
} from 'lucide-react';

const CuestionarioEvaluacion = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(2700); // 45 minutos
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);

  // 25 ítems del cuestionario con escala de cumplimiento
  const questions = [
    {
      id: 1,
      question: "¿Con qué frecuencia su establecimiento controla la temperatura del aceite durante la fritura?",
      category: "Control de Temperatura",
      icon: <Thermometer className="w-5 h-5" />,
      description: "Evalúe la frecuencia con la que monitorea la temperatura del aceite para mantener la calidad."
    },
    {
      id: 2,
      question: "¿Qué tan consistentemente filtra el aceite usado antes de almacenarlo?",
      category: "Filtrado y Purificación",
      icon: <Droplets className="w-5 h-5" />,
      description: "Califique la regularidad con la que aplica procesos de filtrado al aceite usado."
    },
    {
      id: 3,
      question: "¿Con qué frecuencia capacita a su personal en el manejo seguro de aceites de cocina?",
      category: "Capacitación del Personal",
      icon: <BookOpen className="w-5 h-5" />,
      description: "Evalúe la frecuencia de capacitación del personal en prácticas seguras."
    },
    {
      id: 4,
      question: "¿Qué tan regularmente inspecciona visualmente el aceite para detectar signos de degradación?",
      category: "Inspección Visual",
      icon: <CheckCircle className="w-5 h-5" />,
      description: "Califique la frecuencia de inspección visual del estado del aceite."
    },
    {
      id: 5,
      question: "¿Con qué consistencia almacena el aceite usado en recipientes adecuados y etiquetados?",
      category: "Almacenamiento Adecuado",
      icon: <Shield className="w-5 h-5" />,
      description: "Evalúe el cumplimiento en el uso de recipientes apropiados para almacenamiento."
    },
    {
      id: 6,
      question: "¿Qué tan frecuentemente registra las fechas de uso y cambio del aceite?",
      category: "Registro y Documentación",
      icon: <BarChart3 className="w-5 h-5" />,
      description: "Califique la consistencia en el registro de fechas y uso del aceite."
    },
    {
      id: 7,
      question: "¿Con qué regularidad limpia y mantiene los equipos de fritura?",
      category: "Mantenimiento de Equipos",
      icon: <Target className="w-5 h-5" />,
      description: "Evalúe la frecuencia de limpieza y mantenimiento de equipos."
    },
    {
      id: 8,
      question: "¿Qué tan consistentemente separa el aceite usado por tipo y calidad?",
      category: "Separación y Clasificación",
      icon: <Flag className="w-5 h-5" />,
      description: "Califique la práctica de separar aceites según su tipo y estado."
    },
    {
      id: 9,
      question: "¿Con qué frecuencia utiliza equipos de protección personal al manejar aceite caliente?",
      category: "Seguridad Personal",
      icon: <Shield className="w-5 h-5" />,
      description: "Evalúe el uso consistente de EPP durante el manejo de aceites."
    },
    {
      id: 10,
      question: "¿Qué tan regularmente verifica que las áreas de almacenamiento estén libres de contaminación?",
      category: "Control de Contaminación",
      icon: <AlertTriangle className="w-5 h-5" />,
      description: "Califique la frecuencia de verificación de áreas libres de contaminación."
    },
    {
      id: 11,
      question: "¿Con qué consistencia coordina la recolección del aceite usado con empresas autorizadas?",
      category: "Gestión de Recolección",
      icon: <TrendingUp className="w-5 h-5" />,
      description: "Evalúe la regularidad en la coordinación de recolección autorizada."
    },
    {
      id: 12,
      question: "¿Qué tan frecuentemente actualiza los procedimientos de manejo de aceite según normativas?",
      category: "Actualización Normativa",
      icon: <BookOpen className="w-5 h-5" />,
      description: "Califique la frecuencia de actualización de procedimientos normativos."
    },
    {
      id: 13,
      question: "¿Con qué regularidad mide la calidad del aceite usando métodos objetivos?",
      category: "Medición de Calidad",
      icon: <Star className="w-5 h-5" />,
      description: "Evalúe el uso de métodos objetivos para medir calidad del aceite."
    },
    {
      id: 14,
      question: "¿Qué tan consistentemente evita mezclar aceites de diferentes tipos?",
      category: "Prevención de Mezclas",
      icon: <Droplets className="w-5 h-5" />,
      description: "Califique la práctica de evitar mezclar diferentes tipos de aceite."
    },
    {
      id: 15,
      question: "¿Con qué frecuencia revisa y actualiza el plan de emergencias para derrames de aceite?",
      category: "Plan de Emergencias",
      icon: <AlertTriangle className="w-5 h-5" />,
      description: "Evalúe la frecuencia de revisión del plan de emergencias."
    },
    {
      id: 16,
      question: "¿Qué tan regularmente comunica las buenas prácticas de manejo a todo el equipo?",
      category: "Comunicación Interna",
      icon: <BookOpen className="w-5 h-5" />,
      description: "Califique la frecuencia de comunicación de buenas prácticas."
    },
    {
      id: 17,
      question: "¿Con qué consistencia monitorea los costos asociados al manejo del aceite?",
      category: "Control de Costos",
      icon: <BarChart3 className="w-5 h-5" />,
      description: "Evalúe el monitoreo regular de costos relacionados con aceites."
    },
    {
      id: 18,
      question: "¿Qué tan frecuentemente evalúa proveedores de aceite basándose en criterios de sostenibilidad?",
      category: "Evaluación de Proveedores",
      icon: <Target className="w-5 h-5" />,
      description: "Califique la evaluación de proveedores con criterios sostenibles."
    },
    {
      id: 19,
      question: "¿Con qué regularidad implementa mejoras en los procesos de manejo de aceite?",
      category: "Mejora Continua",
      icon: <TrendingUp className="w-5 h-5" />,
      description: "Evalúe la frecuencia de implementación de mejoras en procesos."
    },
    {
      id: 20,
      question: "¿Qué tan consistentemente documenta incidentes relacionados con el manejo de aceite?",
      category: "Documentación de Incidentes",
      icon: <Flag className="w-5 h-5" />,
      description: "Califique la documentación consistente de incidentes relacionados."
    },
    {
      id: 21,
      question: "¿Con qué frecuencia realiza auditorías internas de los procesos de manejo de aceite?",
      category: "Auditorías Internas",
      icon: <CheckCircle className="w-5 h-5" />,
      description: "Evalúe la frecuencia de auditorías internas de procesos."
    },
    {
      id: 22,
      question: "¿Qué tan regularmente verifica el cumplimiento de las normativas ambientales locales?",
      category: "Cumplimiento Normativo",
      icon: <Shield className="w-5 h-5" />,
      description: "Califique la verificación regular del cumplimiento normativo."
    },
    {
      id: 23,
      question: "¿Con qué consistencia mide el impacto ambiental de sus prácticas de manejo de aceite?",
      category: "Impacto Ambiental",
      icon: <Droplets className="w-5 h-5" />,
      description: "Evalúe la medición consistente del impacto ambiental."
    },
    {
      id: 24,
      question: "¿Qué tan frecuentemente busca certificaciones relacionadas con manejo sostenible?",
      category: "Certificaciones",
      icon: <Award className="w-5 h-5" />,
      description: "Califique la búsqueda activa de certificaciones sostenibles."
    },
    {
      id: 25,
      question: "¿Con qué regularidad evalúa la satisfacción del cliente respecto a la calidad de los alimentos fritos?",
      category: "Satisfacción del Cliente",
      icon: <Star className="w-5 h-5" />,
      description: "Evalúe la frecuencia de evaluación de satisfacción del cliente."
    }
  ];

  // Escala de cumplimiento
  const scaleOptions = [
    { value: 1, label: "Nunca", color: "bg-red-500", description: "No se realiza esta práctica" },
    { value: 2, label: "Raramente", color: "bg-orange-500", description: "Se realiza ocasionalmente" },
    { value: 3, label: "A veces", color: "bg-yellow-500", description: "Se realiza algunas veces" },
    { value: 4, label: "Frecuentemente", color: "bg-blue-500", description: "Se realiza la mayoría de las veces" },
    { value: 5, label: "Siempre", color: "bg-green-500", description: "Se realiza consistentemente" }
  ];

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, isSubmitted]);

  // Progress calculation
  useEffect(() => {
    const answeredQuestions = Object.keys(responses).length;
    setProgress((answeredQuestions / questions.length) * 100);
  }, [responses]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResponse = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(responses).length;
    const totalScore = Object.values(responses).reduce((sum, score) => sum + score, 0);
    const maxPossibleScore = totalQuestions * 5;
    const percentage = (totalScore / maxPossibleScore) * 100;

    // Categorización por áreas
    const categoryScores = {};
    questions.forEach(q => {
      if (responses[q.id]) {
        if (!categoryScores[q.category]) {
          categoryScores[q.category] = { total: 0, count: 0 };
        }
        categoryScores[q.category].total += responses[q.id];
        categoryScores[q.category].count += 1;
      }
    });

    const categoryAverages = Object.entries(categoryScores).map(([category, data]) => ({
      category,
      average: (data.total / data.count).toFixed(1),
      percentage: ((data.total / (data.count * 5)) * 100).toFixed(1)
    }));

    return {
      totalScore,
      maxPossibleScore,
      percentage: percentage.toFixed(1),
      answeredQuestions,
      totalQuestions,
      categoryAverages,
      level: percentage >= 80 ? 'Excelente' : 
             percentage >= 60 ? 'Bueno' : 
             percentage >= 40 ? 'Regular' : 'Necesita Mejora'
    };
  };

  const submitEvaluation = () => {
    setIsSubmitted(true);
    setShowResults(true);
  };

  const currentQ = questions[currentQuestion];
  const results = isSubmitted ? calculateResults() : null;

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Evaluación Completada</h1>
              <p className="text-gray-600">Resultados de su evaluación de cumplimiento</p>
            </div>

            {/* Puntuación General */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-blue-600">{results.percentage}%</h2>
                <p className="text-sm text-gray-500">Puntuación Total</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-green-600">{results.answeredQuestions} de {results.totalQuestions}</h2>
                <p className="text-sm text-gray-500">Preguntas Respondidas</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-yellow-600">{results.level}</h2>
                <p className="text-sm text-gray-500">Nivel de Cumplimiento</p>
              </div>
            </div>

            {/* Resultados por Categoría */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resultados por Categoría</h3>
            <div className="space-y-4">
              {results.categoryAverages.map((cat) => (
                <div key={cat.category} className="flex justify-between">
                  <span className="text-gray-700">{cat.category}</span>
                  <span className="font-bold">{cat.average} ({cat.percentage}%)</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button 
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Volver al Inicio
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Cuestionario de Evaluación</h1>
          <p className="text-gray-600 mb-6">Por favor, evalúe cada ítem según la escala de cumplimiento.</p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Tiempo restante: {formatTime(timeRemaining)}</span>
            <span className="text-sm text-gray-500">Pregunta {currentQuestion + 1} de {questions.length}</span>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">{currentQ.icon} {currentQ.question}</h2>
            <p className="text-sm text-gray-500">{currentQ.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {scaleOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleResponse(currentQ.id, option.value)}
                className={`p-4 rounded-lg text-white ${option.color} hover:opacity-80 transition duration-200`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button 
              onClick={prevQuestion} 
              disabled={currentQuestion === 0} 
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
            >
              <ArrowLeft className="w-4 h-4 inline" /> Anterior
            </button>
            <button 
              onClick={currentQuestion === questions.length - 1 ? submitEvaluation : nextQuestion} 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              {currentQuestion === questions.length - 1 ? "Enviar" : "Siguiente"} <ArrowRight className="w-4 h-4 inline" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CuestionarioEvaluacion;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  Layers,
  Upload,
} from "lucide-react";

const MinimalResourcesPage = () => {
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState(1);
  const [mobileUnitsOpen, setMobileUnitsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userGuideUploads, setUserGuideUploads] = useState([]);
  const [units, setUnits] = useState([]);
  const [resources, setResources] = useState([]);
  const fileInputRefs = useRef([]);

  const userId = localStorage.getItem("user_id");

  // Colores para las unidades
  const unitColors = {
    1: {
      color: "from-blue-500 to-blue-600",
      lightColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
    },
    2: {
      color: "from-emerald-500 to-emerald-600",
      lightColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-700",
    },
    3: {
      color: "from-green-500 to-green-600",
      lightColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
    },
    4: {
      color: "from-amber-500 to-amber-600",
      lightColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-700",
    },
  };

  //Fetch educational units
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/v1/educational-unit"
        );
        const data = await res.json();
        const coloredUnits = data.map((unit) => ({
          ...unit,
          ...(unitColors[unit.order] || {}),
          completed: false,
          progress: 0,
        }));
        setUnits(coloredUnits);
        // Selecciona el primer unit.id como valor inicial
        if (coloredUnits.length > 0) {
          setSelectedUnit(coloredUnits[0].id);
        }
      } catch (err) {
        setUnits([]);
        console.log("Error fetching units:", err);
      }
    };
    fetchUnits();
  }, []);

  // Fetch resources and group by educational_unit_id
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/v1/educational-guide"
        );
        const data = await res.json();
        setResources(data);
      } catch (err) {
        setResources([]);
        console.log("Error fetching resources:", err);
      }
    };
    fetchResources();
  }, []);

  //Fetch user uploads and status
  useEffect(() => {
    if (!userId) return;
    fetchUserGuideUploads();
  }, [userId]);

  const fetchUserGuideUploads = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/user-guide-upload/user/${userId}`
      );
      const data = await res.json();
      setUserGuideUploads(data);
    } catch (err) {
      setUserGuideUploads([]);
      console.log("Error fetching user guide uploads:", err);
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchUserGuideUploads();
  }, [userId]);

  const currentResources = resources
    .filter((resource) => resource.unit_id === selectedUnit)
    .sort((a, b) => b.title.localeCompare(a.title));

  const filteredResources = currentResources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (resource.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const getResourceStatus = (resourceId) => {
    const upload = userGuideUploads.find(
      (u) => u.guide && u.guide.id === resourceId
    );
    return upload ? upload.status : "pending";
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Video":
        return <Video className="w-4 h-4" />;
      case "Formato":
        return <Book className="w-4 h-4" />;
      case "Artículo":
        return <FileText className="w-4 h-4" />;
      default:
        return <Book className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Video":
        return "text-red-600 bg-red-50 border-red-200";
      case "Formato":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "Artículo":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
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

  const selectedUnitObj = units.find((u) => u.id === selectedUnit);

  const getStatusChip = (status) => {
    switch (status) {
      case "pending":
        return {
          text: "No completado",
          color: "bg-gray-100 text-gray-700 border-gray-300",
        };
      case "rejected":
        return {
          text: "Rechazado",
          color: "bg-red-100 text-red-700 border-red-300",
        };
      case "pending_approval":
        return {
          text: "Pendiente de aprobación",
          color: "bg-yellow-100 text-yellow-800 border-yellow-300",
        };
      case "approved":
        return {
          text: "Completado",
          color: "bg-green-100 text-green-700 border-green-300",
        };
      default:
        return {
          text: "Sin estado",
          color: "bg-gray-100 text-gray-700 border-gray-300",
        };
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
      <div className="pt-16">
        <div className="flex flex-col gap-8 mb-8 lg:flex-row lg:items-start lg:justify-center">
          <iframe
            title="COCINA HEROICA"
            frameBorder="0"
            width="1200"
            height="675"
            src="https://view.genially.com/6892938bc51cd82df39de936"
            allowFullScreen
            className="rounded-2xl lg:mb-0"
          ></iframe>
          {/* Guías PDF descargables */}
          <div className="flex flex-col w-full gap-6 lg:w-80">
            <div className="flex flex-col items-center p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
              <BookOpen className="w-8 h-8 text-[#256B3E] mb-2" />
              <h4 className="font-bold text-[#256B3E] text-lg mb-2 text-center">
                Guía Rápida - Ruta del Aceite
              </h4>
              <a
                href="https://ecoaceite.s3.us-east-1.amazonaws.com/educational_units/info_files/GU%C3%8DA+R%C3%81PIDA+-Ruta+del+aceite.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-[#FFD439] to-[#F4A300] text-white rounded-xl font-medium shadow hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Descargar PDF
              </a>
            </div>
            <div className="flex flex-col items-center p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
              <BookOpen className="w-8 h-8 text-[#256B3E] mb-2" />
              <h4 className="font-bold text-[#256B3E] text-lg mb-2 text-center">
                Manual Facilitador
              </h4>
              <a
                href="https://ecoaceite.s3.us-east-1.amazonaws.com/educational_units/info_files/MANUAL+FACILITADOR.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-[#FFD439] to-[#F4A300] text-white rounded-xl font-medium shadow hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Descargar PDF
              </a>
            </div>
          </div>
        </div>
        <div className="flex">
          {/* Panel lateral de unidades - Desktop */}
          <aside className="sticky hidden min-h-screen overflow-y-auto bg-white border-r border-gray-200 lg:block w-96 top-24">
            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#256B3E] mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#256B3E] to-[#1F5D34] rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  Retos
                </h2>
                <p className="text-sm text-[#256B3E]/70">
                  Selecciona un reto para observar los distintos formatos
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
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${unit.color} rounded-xl flex items-center justify-center text-white font-bold shadow-lg relative`}
                        >
                          {unit.completed && (
                            <div className="absolute flex items-center justify-center w-5 h-5 bg-green-500 rounded-full -top-1 -right-1">
                              <CheckCircle2 className="w-3 h-3 text-white" />
                            </div>
                          )}
                          {unit.order}
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#256B3E] text-base">
                            {unit.title}
                          </h3>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 text-[#256B3E]/40 transition-transform ${
                          selectedUnit === unit.order ? "rotate-90" : ""
                        }`}
                      />
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-[#256B3E]/60 mb-1">
                        <span>Progreso</span>
                        <span>{unit.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${unit.progress}%` }}
                          className={`h-2 bg-gradient-to-r ${unit.color} rounded-full`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-3">
                        <span className="text-[#256B3E]/60">
                          {unit.resources} recursos
                        </span>
                      </div>
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
                  className="fixed inset-0 z-40 lg:hidden bg-black/50 backdrop-blur-sm"
                />

                {/* Sidebar */}
                <motion.div
                  initial={{ x: -400 }}
                  animate={{ x: 0 }}
                  exit={{ x: -400 }}
                  className="fixed inset-y-0 left-0 z-50 overflow-y-auto bg-white border-r border-gray-200 lg:hidden w-96"
                >
                  <div className="p-6 pt-28">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-[#256B3E] flex items-center gap-2">
                        <GraduationCap className="w-6 h-6" />
                        Unidades
                      </h2>
                      <button
                        onClick={() => setMobileUnitsOpen(false)}
                        className="p-2 transition-colors rounded-lg hover:bg-gray-100"
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
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center mb-3 space-x-3">
                            <div
                              className={`w-10 h-10 bg-gradient-to-r ${unit.color} rounded-xl flex items-center justify-center text-white font-bold relative`}
                            >
                              {unit.completed && (
                                <div className="absolute flex items-center justify-center w-4 h-4 bg-green-500 rounded-full -top-1 -right-1">
                                  <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                                </div>
                              )}
                              {unit.order}
                            </div>
                            <div>
                              <h3 className="font-semibold text-[#256B3E] text-sm">
                                {unit.title}
                              </h3>
                              <p className="text-xs text-[#256B3E]/60">
                                {unit.subtitle}
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-[#256B3E]/70 mb-3 leading-relaxed">
                            {unit.description}
                          </p>

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
                            <span
                              className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(
                                unit.level
                              )} text-xs`}
                            >
                              {unit.level}
                            </span>
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
          <main className="relative z-10 flex-1 max-w-6xl mx-auto">
            <div className="p-6 lg:px-8">
              {/* Header de la unidad actual */}
              <div className="mb-8">
                <div className="flex flex-col items-center justify-between gap-6 mb-6 lg:flex-row">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${selectedUnitObj?.color} rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg relative flex-shrink-0`}
                    >
                      {selectedUnitObj?.completed && (
                        <div className="absolute flex items-center justify-center w-6 h-6 bg-green-500 rounded-full -top-2 -right-2">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                      )}
                      {selectedUnitObj?.order}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h1 className="text-2xl lg:text-3xl font-bold text-[#256B3E] mb-1 break-words">
                        {selectedUnitObj?.title}
                      </h1>
                    </div>
                  </div>

                  {/* Unit stats */}
                  <div className="flex flex-wrap gap-3 lg:flex-col lg:items-end">
                    <div className="px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-xl">
                      <div className="flex items-center space-x-2">
                        <Book className="w-4 h-4 text-[#256B3E]" />
                        <span className="text-sm font-medium text-[#256B3E]">
                          {selectedUnitObj
                            ? `${selectedUnitObj.resources} recursos`
                            : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar for current unit */}
                <div className="p-4 mb-6 bg-white border border-gray-200 shadow-sm rounded-xl">
                  <div className="flex justify-between text-sm text-[#256B3E] mb-2">
                    <span className="font-medium">Progreso del reto</span>
                    <span className="font-bold">
                      {selectedUnitObj?.progress}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${selectedUnitObj?.progress}%`,
                      }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-3 bg-gradient-to-r ${selectedUnitObj?.color} rounded-full shadow-sm`}
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
                      onClick={() => setSearchTerm("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#256B3E]/50 hover:text-[#256B3E] transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Grid de recursos - Mejor centrado */}
              {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                  {filteredResources.map((resource, index) => {
                    const handleUploadClick = () => {
                      fileInputRefs.current[index].click();
                    };

                    const handleFileChange = async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;

                      const formData = new FormData();
                      formData.append("file", file);
                      formData.append("guide_id", resource.id);
                      formData.append("user_id", userId);

                      try {
                        const res = await fetch(
                          "http://localhost:3000/api/v1/user-guide-upload/file",
                          {
                            method: "POST",
                            body: formData,
                          }
                        );
                        if (res.ok) {
                          alert("Archivo subido correctamente");
                          // Vuelve a cargar los uploads para actualizar los status
                          fetchUserGuideUploads();
                        } else {
                          alert("Error al subir el archivo");
                        }
                      } catch (err) {
                        alert("Error de red al subir el archivo");
                        console.log("Error de red al subir el archivo:", err);
                      }
                    };

                    return (
                      <motion.div
                        key={resource.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-[#F4A300]/30 transition-all duration-300 group"
                      >
                        {/* Placeholder de imagen */}
                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                          <img
                            src={resource.guide_image}
                            alt={`Imagen representativa del recurso educativo sobre ${resource.title} - contenido especializado en manejo de aceite de cocina usado con técnicas profesionales y metodologías avanzadas`}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                          {/* Badges */}
                          <div className="absolute flex flex-col gap-2 top-4 right-4">
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getTypeColor(
                                resource.type
                              )}`}
                            >
                              <div className="flex items-center space-x-1">
                                {getTypeIcon(resource.type)}
                                <span>{resource.type}</span>
                              </div>
                            </div>
                            <div
                              className={`px-3 py-1 rounded-full text-xs text-center font-medium border backdrop-blur-sm ${getDifficultyColor(
                                resource.difficulty
                              )}`}
                            >
                              {resource.difficulty}
                            </div>
                          </div>

                          {/* Play button para videos */}
                          {resource.type === "Video" && (
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <div className="flex items-center justify-center w-16 h-16 border rounded-full shadow-lg bg-white/90 backdrop-blur-sm border-white/20">
                                <Play className="w-6 h-6 text-[#256B3E] ml-1" />
                              </div>
                            </motion.div>
                          )}

                          {/* Download icon para recursos descargables */}
                          {resource.downloadable && (
                            <div className="absolute top-4 left-4">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/90 backdrop-blur-sm">
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
                              {/* Chip de estado */}
                              <span
                                className={`px-3 py-1 rounded-full font-medium border ${
                                  getStatusChip(getResourceStatus(resource.id))
                                    .color
                                }`}
                              >
                                {
                                  getStatusChip(getResourceStatus(resource.id))
                                    .text
                                }
                              </span>
                            </div>
                          </div>

                          {/* CTA */}
                          <div className="flex items-center justify-between gap-2 mt-2">
                            <a
                              href={
                                resource.downloadable
                                  ? resource.download_url
                                  : undefined
                              }
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`p-2 rounded-lg bg-gray-50 hover:bg-[#F4A300] hover:text-white transition-all duration-200 flex items-center space-x-1 ${
                                resource.downloadable
                                  ? ""
                                  : "pointer-events-none opacity-50"
                              }`}
                            >
                              <Download className="w-4 h-4" />
                              <span className="text-xs font-medium">
                                Descargar
                              </span>
                            </a>
                            {/* Botón Cargar */}
                            <button
                              className="p-2 rounded-lg bg-gray-50 hover:bg-[#256B3E] hover:text-white transition-all duration-200 flex items-center space-x-1"
                              onClick={handleUploadClick}
                            >
                              <Upload className="w-4 h-4" />
                              <span className="text-xs font-medium">
                                Cargar
                              </span>
                            </button>
                            {/* Input file oculto */}
                            <input
                              type="file"
                              ref={(el) => (fileInputRefs.current[index] = el)}
                              style={{ display: "none" }}
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                /* Estado vacío */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-16 text-center"
                >
                  <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-gray-100 border border-gray-200 rounded-2xl">
                    <Search className="w-12 h-12 text-[#256B3E]/30" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#256B3E]/70 mb-2">
                    No se encontraron recursos
                  </h3>
                  <p className="text-[#256B3E]/50 mb-6 max-w-md mx-auto">
                    {searchTerm
                      ? `No hay recursos que coincidan con "${searchTerm}" en esta unidad.`
                      : "Esta unidad aún no tiene recursos disponibles."}
                  </p>
                  {searchTerm && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSearchTerm("")}
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
                  <div className="relative p-8 overflow-hidden text-center border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute w-24 h-24 bg-green-500 rounded-full top-4 right-4"></div>
                      <div className="absolute w-16 h-16 rounded-full bottom-4 left-4 bg-emerald-500"></div>
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="mb-2 text-2xl font-bold text-green-800">
                        ¡Unidad Completada!
                      </h3>
                      <p className="mb-6 text-green-700">
                        Has completado exitosamente todos los recursos de esta
                        unidad.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/exams")}
                        className="px-8 py-3 font-medium text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl hover:shadow-xl"
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

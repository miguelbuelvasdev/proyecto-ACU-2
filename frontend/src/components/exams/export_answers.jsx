import React, { useEffect, useState } from "react";
import { Download, FileQuestion } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

const ExportAnswers = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Trae los módulos de cuestionario (inicial y final)
    fetch(`${API_BASE_URL}/educational-modules`)
      .then((res) => res.json())
      .then((data) => {
        setModules(
          data.filter((m) => m.type === "inicial" || m.type === "final")
        );
        setLoading(false);
      });
  }, []);

  const handleExport = (moduleId) => {
    window.open(
      `${API_BASE_URL}/user-answer/export/excel/${moduleId}`,
      "_blank"
    );
  };

  return (
    <div className="max-w-2xl px-4 py-12 mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-[#256B3E] flex items-center gap-2">
        <FileQuestion className="w-8 h-8" />
        Exportar Respuestas de Cuestionarios
      </h1>
      {loading ? (
        <div>Cargando cuestionarios...</div>
      ) : (
        <div className="space-y-6">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className="flex items-center justify-between p-6 bg-white border shadow rounded-xl"
            >
              <div>
                <div className="font-semibold text-lg text-[#256B3E]">
                  {mod.title}
                </div>
                <div className="text-sm text-[#F4A300]">
                  {mod.type === "inicial"
                    ? "Cuestionario Inicial"
                    : "Cuestionario Final"}
                </div>
              </div>
              <button
                onClick={() => handleExport(mod.id)}
                className="flex items-center gap-2 px-4 py-2 bg-[#F4A300] text-white rounded-xl font-bold hover:bg-[#256B3E] transition"
              >
                <Download className="w-5 h-5" />
                Exportar Excel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExportAnswers;

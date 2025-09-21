import React, { useEffect, useState } from "react";
import {
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Ban,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

const statusMap = {
  approved: {
    label: "Aprobado",
    color: "bg-green-100 text-green-700 border-green-300",
    icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
  },
  pending_approval: {
    label: "Pendiente",
    color: "bg-yellow-100 text-yellow-700 border-yellow-300",
    icon: <Clock className="w-5 h-5 text-yellow-500" />,
  },
  rejected: {
    label: "Rechazado",
    color: "bg-red-100 text-red-700 border-red-300",
    icon: <XCircle className="w-5 h-5 text-red-500" />,
  },
};

const PAGE_SIZE = 10;

const ResourcesPageAdmin = () => {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(null);
  const [rejecting, setRejecting] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUploads = async (pageNum = 1) => {
    setLoading(true);
    const res = await fetch(
      `${API_BASE_URL}/user-guide-upload?page=${pageNum}&limit=${PAGE_SIZE}`
    );
    const data = await res.json();
    setUploads(data.data || data); // soporta ambos formatos
    setTotalPages(data.total ? Math.ceil(data.total / PAGE_SIZE) : 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchUploads(page);
  }, [page]);

  const handleApprove = async (id) => {
    setApproving(id);
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(
        `${API_BASE_URL}/user-guide-upload/approve/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        setUploads((prev) =>
          prev.map((u) => (u.id === id ? { ...u, status: "approved" } : u))
        );
      }
    } finally {
      setApproving(null);
    }
  };

  const handleReject = async (id) => {
    setRejecting(id);
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch(
        `${API_BASE_URL}/user-guide-upload/reject/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        setUploads((prev) =>
          prev.map((u) => (u.id === id ? { ...u, status: "rejected" } : u))
        );
      }
    } finally {
      setRejecting(null);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">
        Recursos Subidos por Usuarios
      </h1>
      <p className="mb-8 text-gray-600">
        Revisa, descarga y aprueba los recursos subidos por los
        establecimientos.
      </p>
      {loading ? (
        <div className="text-gray-500">Cargando recursos...</div>
      ) : uploads.length === 0 ? (
        <div className="text-gray-500">No hay recursos subidos.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border shadow rounded-xl">
              <thead>
                <tr className="bg-gray-100 text-[#256B3E]">
                  <th className="px-4 py-3 text-left">Establecimiento</th>
                  <th className="px-4 py-3 text-left">Usuario</th>
                  <th className="px-4 py-3 text-left">Unidad</th>
                  <th className="px-4 py-3 text-left">Recurso</th>
                  <th className="px-4 py-3 text-left">Fecha de subida</th>
                  <th className="px-4 py-3 text-left">Estado</th>
                  <th className="px-4 py-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((upload) => (
                  <tr key={upload.id} className="border-b last:border-b-0">
                    <td className="px-4 py-3 font-semibold">
                      {upload.user?.restaurant_name}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{upload.user?.name}</div>
                      <div className="text-xs text-gray-500">
                        {upload.user?.email}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">
                        {upload.guide?.unit?.title || "-"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {upload.guide?.unit?.subtitle}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{upload.guide?.title}</div>
                      <div className="text-xs text-gray-500">
                        {upload.guide?.type}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(upload.uploaded_at).toLocaleString("es-CO")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-semibold ${
                          statusMap[upload.status]?.color ||
                          "bg-gray-100 text-gray-700 border-gray-300"
                        }`}
                      >
                        {statusMap[upload.status]?.icon}
                        {statusMap[upload.status]?.label || upload.status}
                      </span>
                    </td>
                    <td className="flex items-center px-4 py-3 space-x-2">
                      <a
                        href={upload.upload_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 bg-[#256B3E] text-white rounded-lg hover:bg-[#F4A300] transition-colors text-sm"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Descargar
                      </a>
                      {upload.status === "pending_approval" && (
                        <>
                          <button
                            onClick={() => handleApprove(upload.id)}
                            disabled={approving === upload.id}
                            className="inline-flex items-center px-3 py-1 bg-[#F4A300] text-white rounded-lg hover:bg-[#256B3E] transition-colors text-sm disabled:opacity-50"
                          >
                            {approving === upload.id
                              ? "Aprobando..."
                              : "Aprobar"}
                          </button>
                          <button
                            onClick={() => handleReject(upload.id)}
                            disabled={rejecting === upload.id}
                            className="inline-flex items-center px-3 py-1 text-sm text-white transition-colors bg-red-500 rounded-lg hover:bg-red-700 disabled:opacity-50"
                          >
                            <Ban className="w-4 h-4 mr-1" />
                            {rejecting === upload.id
                              ? "Rechazando..."
                              : "Rechazar"}
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Paginación */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium">
              Página {page} de {totalPages}
            </span>
            <button
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ResourcesPageAdmin;

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { Star, TrendingUp } from "lucide-react";
import { Select } from "@headlessui/react"; // O usa un <select> nativo

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

const RADAR_SECTIONS = [
  "Selección y Adquisición de Aceites",
  "Uso Sostenible del Aceite en la Cocina",
  "Manejo Seguro y Responsable del ACU (Aceite de Cocina Usado)",
  "Manejo Seguro y Responsable de Grasas",
];

const RestaurantDashboard = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurantFilter, setRestaurantFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [userQuizResults, setUserQuizResults] = useState([]);
  const [radarUserData, setRadarUserData] = useState(null);
  const [restaurantTotals, setRestaurantTotals] = useState([]);
  const [globalAverage, setGlobalAverage] = useState(null);
  const [stackedUnitScores, setStackedUnitScores] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  // Detecta si es admin
  const [isAdmin, setIsAdmin] = useState(false);

  const userId =
    isAdmin && selectedUserId
      ? selectedUserId
      : localStorage.getItem("user_id");

  // Fetch user list
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const res = await fetch(`${API_BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUsers(data.filter((u) => u.role === "restaurant_owner"));
      } catch (err) {
        setUsers([]);
        console.log("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Fetch resultados de cuestionarios del usuario
  useEffect(() => {
    if (!userId) return;
    fetch(`${API_BASE_URL}/quiz-result/user/${userId}`)
      .then((res) => res.json())
      .then((data) => setUserQuizResults(data))
      .catch(() => setUserQuizResults([]));
  }, [userId]);

  // Fetch radar data para usuario
  useEffect(() => {
    if (!userId) return;
    fetch(`${API_BASE_URL}/user-answer/all-section-averages/${userId}`)
      .then((res) => res.json())
      .then((data) => setRadarUserData(data))
      .catch(() => setRadarUserData(null));
  }, [userId]);

  // Fetch puntajes totales por restaurante (y ubicación)
  useEffect(() => {
    if (!userId) return;
    fetch(
      `${API_BASE_URL}/user-educational-unit-progress/totals/by-user?userId=${userId}`
    )
      .then((res) => res.json())
      .then((data) => setRestaurantTotals(data))
      .catch(() => setRestaurantTotals([]));
  }, [userId]);

  // Fetch global average
  useEffect(() => {
    if (!userId) return;
    fetch(
      `${API_BASE_URL}/user-educational-unit-progress/global/average?userId=${userId}`
    )
      .then((res) => res.json())
      .then((data) => setGlobalAverage(data.global_average))
      .catch(() => setGlobalAverage(null));
  }, [userId]);

  // Fetch puntajes por unidad y restaurante para gráfica apilada
  useEffect(() => {
    if (!userId) return;
    fetch(
      `${API_BASE_URL}/user-educational-unit-progress/scores/by-unit-and-restaurant?userId=${userId}`
    )
      .then((res) => res.json())
      .then((data) => setStackedUnitScores(data))
      .catch(() => setStackedUnitScores([]));
  }, [userId]);

  // Extraer score inicial y final
  const quizScores = useMemo(() => {
    let inicial = null;
    let final = null;
    userQuizResults.forEach((result) => {
      if (result.module?.type === "inicial") inicial = result.score;
      if (result.module?.type === "final") final = result.score;
    });
    return { inicial, final };
  }, [userQuizResults]);

  // Procesar data para gráfica apilada
  const stackedBarData = useMemo(() => {
    // Agrupar por restaurante
    const grouped = {};
    stackedUnitScores.forEach((item) => {
      if (!grouped[item.restaurant_name]) {
        grouped[item.restaurant_name] = {
          restaurant_name: item.restaurant_name,
        };
      }
      grouped[item.restaurant_name][item.unit_name] = item.total_score;
    });
    // Convertir a array
    return Object.values(grouped);
  }, [stackedUnitScores]);

  const unitNames = useMemo(
    () => [...new Set(stackedUnitScores.map((item) => item.unit_name))],
    [stackedUnitScores]
  );

  const restaurants = useMemo(() => {
    return restaurantTotals.map((r) => ({
      name: r.restaurant_name,
      location: [r.latitude, r.longitude],
      puntaje: { actual: r.total_score },
    }));
  }, [restaurantTotals]);

  // Funciones de utilidad
  const calculateAverage = (restaurants, path) => {
    return (
      restaurants.reduce((acc, restaurant) => {
        const value = path
          .split(".")
          .reduce((obj, key) => obj[key], restaurant);
        return acc + value;
      }, 0) / (restaurants.length || 1)
    );
  };

  const filteredRestaurants = restaurantFilter
    ? restaurants.filter((r) => r.name === restaurantFilter)
    : restaurants;

  // Datos computados usando useMemo para optimización
  const computedData = useMemo(() => {
    const systemIndicators = {
      totalRestaurants: filteredRestaurants.length,
      averageScoreBefore: 0, // Ya no se usa el mock, puedes eliminar si no lo necesitas
      averageScoreAfter: Math.round(
        calculateAverage(filteredRestaurants, "puntaje.actual")
      ),
    };

    // Radar y comparación siguen igual
    let radarData = [];
    if (radarUserData) {
      radarData = RADAR_SECTIONS.map((section) => ({
        indicator: section,
        inicial: radarUserData.inicial?.[section] ?? 0,
        final: radarUserData.final?.[section] ?? 0,
      }));
    } else {
      radarData = RADAR_SECTIONS.map((section) => ({
        indicator: section,
        inicial: 0,
        final: 0,
      }));
    }

    const comparisonData = radarData.map((item) => ({
      categoria: item.indicator,
      antes: item.inicial,
      actual: item.final,
    }));

    return {
      systemIndicators,
      radarData,
      comparisonData,
    };
  }, [filteredRestaurants, radarUserData]);

  // Componentes reutilizables
  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    color,
    suffix = "",
    subtitle,
    isReverse = false,
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2 space-x-2">
            <Icon className={`w-5 h-5 ${color}`} />
            <p className="text-sm font-medium text-gray-600">{title}</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {value}
            {suffix}
          </p>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
          {change && (
            <div className="flex items-center mt-2">
              <TrendingUp
                className={`w-4 h-4 mr-1 ${
                  isReverse
                    ? change < 0
                      ? "text-green-500"
                      : "text-red-500 transform rotate-180"
                    : change > 0
                    ? "text-green-500"
                    : "text-red-500 transform rotate-180"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  isReverse
                    ? change < 0
                      ? "text-green-500"
                      : "text-red-500"
                    : change > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {Math.abs(change)}
              </span>
              <span className="ml-1 text-sm text-gray-500">
                puntos de mejora
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  const CustomXAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={20} textAnchor="end" fill="#666" fontSize={10}>
          {payload.value.split(" ").map((line, i) => (
            <tspan key={i} x={0} dy={i === 0 ? 0 : 12}>
              {line}
            </tspan>
          ))}
        </text>
      </g>
    );
  };

  //Map related functions
  const InteractiveMap = () => {
    const [mapLoaded, setMapLoaded] = useState(false);

    React.useEffect(() => {
      // Cargar Leaflet dinámicamente
      const loadLeaflet = async () => {
        try {
          // Cargar CSS de Leaflet
          if (!document.querySelector('link[href*="leaflet"]')) {
            const leafletCSS = document.createElement("link");
            leafletCSS.rel = "stylesheet";
            leafletCSS.href =
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
            document.head.appendChild(leafletCSS);
          }

          // Cargar JS de Leaflet
          if (!window.L) {
            await new Promise((resolve, reject) => {
              const script = document.createElement("script");
              script.src =
                "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
              script.onload = resolve;
              script.onerror = reject;
              document.body.appendChild(script);
            });
          }

          setMapLoaded(true);
        } catch (error) {
          console.error("Error loading Leaflet:", error);
        }
      };

      loadLeaflet();
    }, []);

    React.useEffect(() => {
      if (mapLoaded && window.L) {
        // Limpiar mapa existente
        const mapContainer = document.getElementById("map-container");
        if (mapContainer) {
          mapContainer.innerHTML = "";
        }

        // Crear nuevo mapa
        const map = window.L.map("map-container", {
          center: [10.424, -75.552],
          zoom: 16,
          zoomControl: true,
        });

        // Agregar tiles
        window.L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }
        ).addTo(map);

        // Agregar marcadores usando restaurantTotals
        restaurantTotals.forEach((restaurant) => {
          const productivity = restaurant.total_score;
          let color = "#ef4444"; // Rojo por defecto

          if (productivity >= 70) color = "#22c55e"; // Verde
          else if (productivity >= 60) color = "#f59e0b"; // Amarillo

          const customIcon = window.L.divIcon({
            html: `<div style="background-color: ${color}; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
                     <span style="color: white; font-size: 12px; font-weight: bold;">${Math.round(
                       productivity
                     )}</span>
                   </div>`,
            className: "custom-marker",
            iconSize: [25, 25],
            iconAnchor: [12, 12],
          });

          const marker = window.L.marker(
            [restaurant.latitude, restaurant.longitude],
            {
              icon: customIcon,
            }
          ).addTo(map);

          // Tooltip al pasar el mouse
          marker.bindTooltip(
            `<strong>${restaurant.restaurant_name}</strong><br/>Puntaje: ${restaurant.total_score}`,
            {
              direction: "top",
              offset: [0, -10],
              permanent: false,
              opacity: 0.95,
            }
          );

          // Popup al hacer click (opcional, puedes dejarlo si quieres)
          const popupContent = `
            <div style="padding: 8px; min-width: 200px;">
              <h3 style="font-weight: bold; font-size: 16px; margin: 0 0 8px 0;">${restaurant.restaurant_name}</h3>
              <div style="margin-top: 8px;">
                <div style="display: flex; justify-between; font-size: 12px;">
                  <span>Puntaje total:</span>
                  <span style="font-weight: bold;">${restaurant.total_score}</span>
                </div>
              </div>
            </div>
          `;
          marker.bindPopup(popupContent);

          marker.on("click", () =>
            setSelectedRestaurant({
              name: restaurant.restaurant_name,
              puntaje: { actual: restaurant.total_score },
              location: [restaurant.latitude, restaurant.longitude],
            })
          );
        });

        // Cleanup function
        return () => {
          if (map) {
            map.remove();
          }
        };
      }
    }, [mapLoaded, restaurantTotals]);

    if (!mapLoaded) {
      return (
        <div className="flex items-center justify-center bg-gray-100 rounded-lg h-96">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            <p className="text-gray-500">Cargando mapa...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="overflow-hidden rounded-lg h-96">
        <div id="map-container" className="w-full h-full"></div>
      </div>
    );
  };

  // Cambia el userId para los fetch según el filtro
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (isAdmin && selectedUserId) {
      fetch(`${API_BASE_URL}/quiz-result/user/${selectedUserId}`)
        .then((res) => res.json())
        .then((data) => setUserQuizResults(data))
        .catch(() => setUserQuizResults([]));

      fetch(
        `${API_BASE_URL}/user-answer/all-section-averages/${selectedUserId}`
      )
        .then((res) => res.json())
        .then((data) => setRadarUserData(data))
        .catch(() => setRadarUserData(null));

      fetch(
        `${API_BASE_URL}/user-educational-unit-progress/totals/by-user?userId=${selectedUserId}`
      )
        .then((res) => res.json())
        .then((data) => setRestaurantTotals(data))
        .catch(() => setRestaurantTotals([]));

      fetch(
        `${API_BASE_URL}/user-educational-unit-progress/global/average?userId=${selectedUserId}`
      )
        .then((res) => res.json())
        .then((data) => setGlobalAverage(data.global_average))
        .catch(() => setGlobalAverage(null));

      fetch(
        `${API_BASE_URL}/user-educational-unit-progress/scores/by-unit-and-restaurant?userId=${selectedUserId}`
      )
        .then((res) => res.json())
        .then((data) => setStackedUnitScores(data))
        .catch(() => setStackedUnitScores([]));
    }
  }, [selectedUserId, isAdmin]);

  useEffect(() => {
    const role = localStorage.getItem("user_role");
    setIsAdmin(role === "admin");
  }, []);

  const [classification, setClassification] = useState("");
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!userId || !token) return;
    fetch(`${API_BASE_URL}/restaurant/by-user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setClassification(data.classification || ""));
  }, [userId, token]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Dashboard Avance Retos
          </h1>
        </motion.div>

        {/* Clasificación del restaurante */}
        {!isAdmin && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#256B3E] mb-2">
              Clasificación del restaurante
            </h2>
            <p className="text-[#256B3E]/80 text-lg">
              {classification ? classification : "Sin clasificación registrada"}
            </p>
          </div>
        )}

        {/* Indicadores Principales */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
          <StatCard
            title="Restaurantes Activos"
            value={restaurants.length}
            icon={Star}
            color="text-blue-500"
            subtitle="En el programa"
          />
          <StatCard
            title="Puntaje Promedio Global"
            value={
              globalAverage !== null ? Number(globalAverage).toFixed(2) : "--"
            }
            icon={TrendingUp}
            color="text-green-600"
            subtitle="Promedio total de todos los restaurantes"
          />
        </div>

        {/* Gráfica de barras horizontales: Puntaje total por restaurante */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 mb-8 bg-white border border-gray-100 shadow-lg rounded-2xl"
        >
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Puntaje total por restaurante
          </h2>
          <ResponsiveContainer
            width="100%"
            height={50 + 50 * restaurantTotals.length}
          >
            <BarChart
              data={restaurantTotals}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 250]} />{" "}
              {/* <-- Limita el eje X de 0 a 250 */}
              <YAxis
                dataKey="restaurant_name"
                type="category"
                width={180}
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="total_score"
                fill="#256B3E"
                name="Puntaje total"
                barSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Gráfica de barras apiladas: Puntajes por unidad de cada restaurante */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 mb-8 bg-white border border-gray-100 shadow-lg rounded-2xl"
        >
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Puntaje por unidad y restaurante
          </h2>
          <ResponsiveContainer
            width="100%"
            height={60 + 40 * stackedBarData.length}
          >
            <BarChart
              data={stackedBarData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis
                dataKey="restaurant_name"
                type="category"
                width={180}
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                wrapperStyle={{ right: -10 }}
              />
              {unitNames.map((unit, idx) => (
                <Bar
                  key={unit}
                  dataKey={unit}
                  stackId="a"
                  fill={
                    [
                      "#256B3E",
                      "#F4A300",
                      "#FFD439",
                      "#22c55e",
                      "#ef4444",
                      "#3b82f6",
                    ][idx % 6]
                  }
                  name={unit}
                  barSize={28}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Mapa */}
        <div className="grid grid-cols-1 gap-8 mb-8 ">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative z-0 p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Ubicación y Puntaje
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>70-100%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>60-69%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>&lt;60%</span>
                </div>
              </div>
            </div>
            <InteractiveMap />
          </motion.div>
        </div>

        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Dashboard Cuestionarios
        </h1>

        {/* Filtro para admin */}
        {isAdmin && (
          <div className="mb-6">
            <label className="block mb-1 font-medium text-[#256B3E]">
              Filtrar por restaurante
            </label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="px-3 py-2 border rounded"
            >
              <option value="">Selecciona un restaurante</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.restaurant_name || user.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Card de Puntaje Inicial y Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-between gap-6 p-6 mb-8 bg-white border border-gray-100 shadow-lg rounded-2xl md:flex-row"
        >
          <div className="flex items-center gap-4">
            <Star className="w-10 h-10 text-yellow-400" />
            <div>
              <h2 className="mb-1 text-lg font-bold text-gray-900">
                Puntaje Cuestionarios
              </h2>
              <p className="text-sm text-gray-600">
                Tu progreso general en los cuestionarios
              </p>
            </div>
          </div>
          <div className="flex items-center gap-8 mt-4 md:mt-0">
            <div className="flex flex-col items-center">
              <span className="mb-1 text-xs text-gray-500">Antes</span>
              <span className="text-3xl font-bold text-[#ef4444]">
                {quizScores.inicial !== null ? quizScores.inicial : "--"}
              </span>
            </div>
            <div className="w-8 h-0.5 bg-gray-200 rounded-full"></div>
            <div className="flex flex-col items-center">
              <span className="mb-1 text-xs text-gray-500">Después</span>
              <span className="text-3xl font-bold text-[#22c55e]">
                {quizScores.final !== null ? quizScores.final : "--"}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-2">
          {/* Gráfico de Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
          >
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Comparativa por sección
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={computedData.radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="indicator" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis angle={90} domain={[0, 5]} />
                <Radar
                  name="Antes"
                  dataKey="inicial"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.1}
                />
                <Radar
                  name="Después"
                  dataKey="final"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.3}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Gráfico de Barras */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
          >
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Puntajes promedio por sección
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={computedData.comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="categoria"
                  angle={-30}
                  textAnchor="end"
                  height={100}
                  interval={0}
                  tick={<CustomXAxisTick />}
                />
                <YAxis domain={[0, 5]} /> {/* <-- Limita el eje Y de 0 a 5 */}
                <Tooltip />
                <Legend />
                <Bar dataKey="antes" fill="#ef4444" name="Antes" />
                <Bar dataKey="actual" fill="#22c55e" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
const CustomXAxisTick = (props) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={28} textAnchor="end" fill="#666" fontSize={10}>
        {payload.value.split(" ").map((line, i) => (
          <tspan key={i} x={0} dy={i === 0 ? 0 : 12}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
};

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
  LineChart,
  Line,
} from "recharts";
import {
  MapPin,
  TrendingUp,
  Award,
  Users,
  Building,
  Calendar,
  Clock,
  Target,
  Star,
  ChevronRight,
  Filter,
  Download,
  BarChart3,
  Activity,
  Zap,
  Shield,
  CheckCircle,
  DollarSign,
  Thermometer,
  AlertTriangle,
  Settings,
  Wrench,
  Leaf,
} from "lucide-react";

const RestaurantDashboard = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurantFilter, setRestaurantFilter] = useState("");
  const [users, setUsers] = useState([]);

  // Datos de restaurantes - Centralizados y normalizados
  //Todo: obtener datos de los cuestionarios de los restaurantes
  const restaurants = useMemo(
    () => [
      {
        id: 1,
        name: "La Cocina de María",
        location: [10.4236, -75.5518],
        category: "Restaurante Tradicional",
        owner: "María González",
        indicadoresSalida: {
          seleccionAceites: { antes: 46, actual: 71, meta: 80 },
          usoSostenible: { antes: 80, actual: 100, meta: 100 },
          manejoACU: { antes: 66, actual: 55, meta: 45 },
          manejoGrasas: { antes: 55, actual: 67, meta: 75 },
          evaluacionEconomica: { antes: 10, actual: 67, meta: 80 },
        },
        puntaje: { antes: 58, actual: 71 },
        mejoras: [
          "Implementación de sistema de filtrado avanzado",
          "Capacitación completa del personal en manejo sostenible",
          "Reducción del 40% en residuos generados",
          "Certificación Bronze en sostenibilidad",
        ],
      },
      {
        id: 2,
        name: "Pizzería Don Luigi",
        location: [10.4242, -75.5512],
        category: "Pizzería",
        owner: "Luigi Rossi",
        indicadoresSalida: {
          seleccionAceites: { antes: 40, actual: 65, meta: 80 },
          usoSostenible: { antes: 75, actual: 95, meta: 100 },
          manejoACU: { antes: 70, actual: 60, meta: 50 },
          manejoGrasas: { antes: 50, actual: 62, meta: 75 },
          evaluacionEconomica: { antes: 8, actual: 55, meta: 80 },
        },
        puntaje: { antes: 52, actual: 65 },
        mejoras: [
          "Instalación de equipos de reciclaje",
          "Mejora en procesos de cocción",
          "Reducción del 35% en consumo energético",
        ],
      },
      {
        id: 3,
        name: "Café Central",
        location: [10.4248, -75.5525],
        category: "Cafetería",
        owner: "Ana Rodríguez",
        indicadoresSalida: {
          seleccionAceites: { antes: 35, actual: 58, meta: 80 },
          usoSostenible: { antes: 70, actual: 88, meta: 100 },
          manejoACU: { antes: 75, actual: 65, meta: 55 },
          manejoGrasas: { antes: 45, actual: 55, meta: 75 },
          evaluacionEconomica: { antes: 5, actual: 45, meta: 80 },
        },
        puntaje: { antes: 48, actual: 58 },
        mejoras: [
          "Optimización de procesos de preparación",
          "Implementación de prácticas de ahorro energético",
          "Mejora en la gestión de residuos orgánicos",
        ],
      },
      {
        id: 4,
        name: "Restaurante El Dorado",
        location: [10.423, -75.553],
        category: "Restaurante Gourmet",
        owner: "Carlos Mendoza",
        indicadoresSalida: {
          seleccionAceites: { antes: 55, actual: 85, meta: 80 },
          usoSostenible: { antes: 85, actual: 100, meta: 80 },
          manejoACU: { antes: 60, actual: 45, meta: 40 },
          manejoGrasas: { antes: 65, actual: 78, meta: 75 },
          evaluacionEconomica: { antes: 15, actual: 75, meta: 80 },
        },
        puntaje: { antes: 65, actual: 82 },
        mejoras: [
          "Certificación Gold en sostenibilidad",
          "Implementación completa de tecnología verde",
          "Reducción del 50% en huella de carbono",
          "Programa de capacitación avanzada",
        ],
      },
      {
        id: 5,
        name: "Marisquería La Perla",
        location: [10.4255, -75.5508],
        category: "Marisquería",
        owner: "Roberto Silva",
        indicadoresSalida: {
          seleccionAceites: { antes: 42, actual: 68, meta: 80 },
          usoSostenible: { antes: 78, actual: 92, meta: 100 },
          manejoACU: { antes: 68, actual: 58, meta: 48 },
          manejoGrasas: { antes: 52, actual: 64, meta: 75 },
          evaluacionEconomica: { antes: 12, actual: 62, meta: 80 },
        },
        puntaje: { antes: 55, actual: 68 },
        mejoras: [
          "Especialización en manejo de aceites de fritura",
          "Implementación de sistema de monitoreo continuo",
          "Certificación Silver en sostenibilidad",
        ],
      },
    ],
    []
  );

  // Configuración de indicadores

  //*Fetches
  //Fetch user list
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const res = await fetch("http://localhost:3000/api/v1/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setUsers([]);
        console.log("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Funciones de utilidad
  const calculateAverage = (restaurants, path) => {
    return (
      restaurants.reduce((acc, restaurant) => {
        const value = path
          .split(".")
          .reduce((obj, key) => obj[key], restaurant);
        return acc + value;
      }, 0) / restaurants.length
    );
  };

  const filteredRestaurants = restaurantFilter
    ? restaurants.filter((r) => r.name === restaurantFilter)
    : restaurants;

  // Datos computados usando useMemo para optimización
  const computedData = useMemo(() => {
    const systemIndicators = {
      totalRestaurants: filteredRestaurants.length,
      averageScoreBefore: Math.round(
        calculateAverage(filteredRestaurants, "puntaje.antes")
      ),
      averageScoreAfter: Math.round(
        calculateAverage(filteredRestaurants, "puntaje.actual")
      ),
    };

    const performanceData = filteredRestaurants.map((restaurant) => ({
      name: restaurant.name.split(" ").slice(0, 2).join(" "),
      puntajeAntes: restaurant.puntaje.antes,
      puntajeActual: restaurant.puntaje.actual,
      mejora: restaurant.puntaje.actual - restaurant.puntaje.antes,
    }));

    const radarIndicators = [
      "Selección y Adquisición de Aceites",
      "Uso Sostenible del Aceite de Cocina",
      "Manejo Seguro y Responsable del ACU",
      "Manejo Seguro y Responsable de Grasas",
      "Evaluación Económica",
    ];
    const keys = [
      "seleccionAceites",
      "usoSostenible",
      "manejoACU",
      "manejoGrasas",
      "evaluacionEconomica",
    ];
    const radarData = radarIndicators.map((name, idx) => ({
      indicator: name,
      antes: calculateAverage(
        filteredRestaurants,
        `indicadoresSalida.${keys[idx]}.antes`
      ),
      actual: calculateAverage(
        filteredRestaurants,
        `indicadoresSalida.${keys[idx]}.actual`
      ),
      meta: calculateAverage(
        filteredRestaurants,
        `indicadoresSalida.${keys[idx]}.meta`
      ),
    }));

    const comparisonData = radarIndicators.map((name, idx) => ({
      categoria: name,
      antes: calculateAverage(
        filteredRestaurants,
        `indicadoresSalida.${keys[idx]}.antes`
      ),
      actual: calculateAverage(
        filteredRestaurants,
        `indicadoresSalida.${keys[idx]}.actual`
      ),
    }));

    const timelineData = [
      { mes: "Ene", promedio: 52 },
      { mes: "Feb", promedio: 55 },
      { mes: "Mar", promedio: 58 },
      { mes: "Abr", promedio: 61 },
      { mes: "May", promedio: 64 },
      { mes: "Jun", promedio: 66 },
      { mes: "Jul", promedio: 68 },
      { mes: "Ago", promedio: 70 },
      { mes: "Sep", promedio: 71 },
      { mes: "Oct", promedio: 72 },
      { mes: "Nov", promedio: 73 },
    ];

    return {
      systemIndicators,
      performanceData,
      radarData,
      comparisonData,
      timelineData,
    };
  }, [filteredRestaurants]);

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

        // Agregar marcadores
        restaurants.forEach((restaurant) => {
          const productivity = restaurant.puntaje.actual;
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

          const marker = window.L.marker(restaurant.location, {
            icon: customIcon,
          }).addTo(map);

          const popupContent = `
            <div style="padding: 8px; min-width: 200px;">
              <h3 style="font-weight: bold; font-size: 16px; margin: 0 0 8px 0;">${
                restaurant.name
              }</h3>
              <p style="color: #666; font-size: 14px; margin: 4px 0;">${
                restaurant.category
              }</p>
              <p style="font-size: 14px; margin: 4px 0;">Propietario: ${
                restaurant.owner
              }</p>
              <div style="margin-top: 8px;">
                <div style="display: flex; justify-between; font-size: 12px;">
                  <span>Productividad:</span>
                  <span style="font-weight: bold;">${
                    restaurant.puntaje.actual
                  }%</span>
                </div>
                <div style="display: flex; justify-between; font-size: 12px;">
                  <span>Mejora:</span>
                  <span style="font-weight: bold;">+${
                    restaurant.puntaje.actual - restaurant.puntaje.antes
                  }%</span>
                </div>
              </div>
            </div>
          `;

          marker.bindPopup(popupContent);
          marker.on("click", () => setSelectedRestaurant(restaurant));
        });

        // Cleanup function
        return () => {
          if (map) {
            map.remove();
          }
        };
      }
    }, [mapLoaded]);

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

  const averageScoreBeforeGlobal = Math.round(
    calculateAverage(restaurants, "puntaje.antes")
  );
  const averageScoreAfterGlobal = Math.round(
    calculateAverage(restaurants, "puntaje.actual")
  );

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
            Dashboard de Indicadores de Salida
          </h1>
          <p className="text-gray-600">
            Monitoreo de indicadores de calidad, impacto ambiental, costos y
            productividad
          </p>
        </motion.div>

        {/* Indicadores Principales */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 ">
          <StatCard
            title="Restaurantes Activos"
            value={restaurants.length}
            icon={Building}
            color="text-blue-500"
            subtitle="En el programa"
          />

          <StatCard
            title="Puntaje Promedio Global"
            value={averageScoreAfterGlobal}
            suffix="/100"
            icon={Star}
            color="text-purple-500"
            subtitle={`Antes: ${averageScoreBeforeGlobal}/100`}
          />
        </div>

        {/* Mapa Placeholder */}
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

        {/* Filtrar por Restaurante */}
        <div className="flex items-center gap-4 mb-8">
          <label
            htmlFor="restaurant-filter"
            className="text-sm font-medium text-gray-700"
          >
            Filtrar por restaurante:
          </label>
          <select
            id="restaurant-filter"
            value={restaurantFilter}
            onChange={(e) => setRestaurantFilter(e.target.value)}
            className="px-3 py-2 text-gray-900 bg-white border border-gray-300 rounded-lg"
          >
            <option value="">Todos</option>
            {restaurants.map((r) => (
              <option key={r.id} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-8 lg:grid-cols-2">
          {/* Gráfico de Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl"
          >
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Indicadores de Salida Promedio
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={computedData.radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="indicator" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Antes"
                  dataKey="antes"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.1}
                />
                <Radar
                  name="Actual"
                  dataKey="actual"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Meta"
                  dataKey="meta"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.1}
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
              Comparación Antes vs Actual
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
                <YAxis />
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

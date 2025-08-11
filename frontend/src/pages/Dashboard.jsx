import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  LineChart, Line
} from 'recharts';
import { 
  MapPin, TrendingUp, Award, Users, Building,
  Calendar, Clock, Target, Star, ChevronRight, Filter, Download,
  BarChart3, Activity, Zap, Shield, CheckCircle,
  DollarSign, Thermometer, AlertTriangle, Settings, Wrench, Leaf
} from 'lucide-react';

const RestaurantDashboard = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');

  // Datos de restaurantes - Centralizados y normalizados
  const restaurants = [
    {
      id: 1,
      name: "La Cocina de María",
      location: [10.4236, -75.5518],
      category: "Restaurante Tradicional",
      owner: "María González",
      indicadoresSalida: {
        reduccionManejoInadecuado: { antes: 46, actual: 71, meta: 80 },
        cumplimientoNormativo: { antes: 80, actual: 100, meta: 100 },
        optimizacionCostos: { antes: 66, actual: 55, meta: 45 },
        generacionIngresos: { antes: 55, actual: 67, meta: 75 },
        eficienciaMantenimiento: { antes: 10, actual: 67, meta: 80 },
        procedimientosEstandarizados: { antes: 12, actual: 67, meta: 85 },
        capacitacionPersonal: { antes: 22, actual: 44, meta: 70 }
      },
      productividad: { antes: 58, actual: 71 },
      mejoras: [
        "Implementación de sistema de filtrado avanzado",
        "Capacitación completa del personal en manejo sostenible",
        "Reducción del 40% en residuos generados",
        "Certificación Bronze en sostenibilidad"
      ]
    },
    {
      id: 2,
      name: "Pizzería Don Luigi",
      location: [10.4242, -75.5512],
      category: "Pizzería",
      owner: "Luigi Rossi",
      indicadoresSalida: {
        reduccionManejoInadecuado: { antes: 40, actual: 65, meta: 80 },
        cumplimientoNormativo: { antes: 75, actual: 95, meta: 100 },
        optimizacionCostos: { antes: 70, actual: 60, meta: 50 },
        generacionIngresos: { antes: 50, actual: 62, meta: 75 },
        eficienciaMantenimiento: { antes: 8, actual: 55, meta: 80 },
        procedimientosEstandarizados: { antes: 15, actual: 60, meta: 85 },
        capacitacionPersonal: { antes: 18, actual: 38, meta: 70 }
      },
      productividad: { antes: 52, actual: 65 },
      mejoras: [
        "Instalación de equipos de reciclaje",
        "Mejora en procesos de cocción",
        "Reducción del 35% en consumo energético"
      ]
    },
    {
      id: 3,
      name: "Café Central",
      location: [10.4248, -75.5525],
      category: "Cafetería",
      owner: "Ana Rodríguez",
      indicadoresSalida: {
        reduccionManejoInadecuado: { antes: 35, actual: 58, meta: 80 },
        cumplimientoNormativo: { antes: 70, actual: 88, meta: 100 },
        optimizacionCostos: { antes: 75, actual: 65, meta: 55 },
        generacionIngresos: { antes: 45, actual: 55, meta: 75 },
        eficienciaMantenimiento: { antes: 5, actual: 45, meta: 80 },
        procedimientosEstandarizados: { antes: 10, actual: 50, meta: 85 },
        capacitacionPersonal: { antes: 15, actual: 32, meta: 70 }
      },
      productividad: { antes: 48, actual: 58 },
      mejoras: [
        "Optimización de procesos de preparación",
        "Implementación de prácticas de ahorro energético",
        "Mejora en la gestión de residuos orgánicos"
      ]
    },
    {
      id: 4,
      name: "Restaurante El Dorado",
      location: [10.4230, -75.5530],
      category: "Restaurante Gourmet",
      owner: "Carlos Mendoza",
      indicadoresSalida: {
        reduccionManejoInadecuado: { antes: 55, actual: 85, meta: 80 },
        cumplimientoNormativo: { antes: 85, actual: 100, meta: 100 },
        optimizacionCostos: { antes: 60, actual: 45, meta: 40 },
        generacionIngresos: { antes: 65, actual: 78, meta: 75 },
        eficienciaMantenimiento: { antes: 15, actual: 75, meta: 80 },
        procedimientosEstandarizados: { antes: 20, actual: 80, meta: 85 },
        capacitacionPersonal: { antes: 30, actual: 55, meta: 70 }
      },
      productividad: { antes: 65, actual: 82 },
      mejoras: [
        "Certificación Gold en sostenibilidad",
        "Implementación completa de tecnología verde",
        "Reducción del 50% en huella de carbono",
        "Programa de capacitación avanzada"
      ]
    },
    {
      id: 5,
      name: "Marisquería La Perla",
      location: [10.4255, -75.5508],
      category: "Marisquería",
      owner: "Roberto Silva",
      indicadoresSalida: {
        reduccionManejoInadecuado: { antes: 42, actual: 68, meta: 80 },
        cumplimientoNormativo: { antes: 78, actual: 92, meta: 100 },
        optimizacionCostos: { antes: 68, actual: 58, meta: 48 },
        generacionIngresos: { antes: 52, actual: 64, meta: 75 },
        eficienciaMantenimiento: { antes: 12, actual: 62, meta: 80 },
        procedimientosEstandarizados: { antes: 18, actual: 65, meta: 85 },
        capacitacionPersonal: { antes: 25, actual: 42, meta: 70 }
      },
      productividad: { antes: 55, actual: 68 },
      mejoras: [
        "Especialización en manejo de aceites de fritura",
        "Implementación de sistema de monitoreo continuo",
        "Certificación Silver en sostenibilidad"
      ]
    }
  ];

  // Configuración de indicadores
  const indicatorConfig = {
    reduccionManejoInadecuado: { name: "Reducción Manejo Inadecuado", isReverse: false },
    cumplimientoNormativo: { name: "Cumplimiento Normativo", isReverse: false },
    optimizacionCostos: { name: "Optimización de Costos", isReverse: true },
    generacionIngresos: { name: "Generación de Ingresos", isReverse: false },
    eficienciaMantenimiento: { name: "Eficiencia Mantenimiento", isReverse: false },
    procedimientosEstandarizados: { name: "Procedimientos Estandarizados", isReverse: false },
    capacitacionPersonal: { name: "Capacitación Personal", isReverse: false }
  };

  // Funciones de utilidad
  const calculateAverage = (restaurants, path) => {
    return restaurants.reduce((acc, restaurant) => {
      const value = path.split('.').reduce((obj, key) => obj[key], restaurant);
      return acc + value;
    }, 0) / restaurants.length;
  };

  const calculateImprovement = (antes, actual, isReverse = false) => {
    return isReverse ? antes - actual : actual - antes;
  };

  const getProductivityColor = (productivity) => {
    if (productivity >= 70) return "#22c55e";
    if (productivity >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const getStatusBadge = (actual, meta) => {
    const percentage = (actual / meta) * 100;
    if (percentage >= 100) return { text: "Completado", class: "bg-green-100 text-green-800" };
    if (percentage >= 80) return { text: "En Progreso", class: "bg-yellow-100 text-yellow-800" };
    return { text: "Iniciando", class: "bg-red-100 text-red-800" };
  };

  // Datos computados usando useMemo para optimización
  const computedData = useMemo(() => {
    const systemIndicators = {
      totalRestaurants: restaurants.length,
      averageProductivity: Math.round(calculateAverage(restaurants, 'productividad.actual')),
      averageImprovement: Math.round(restaurants.reduce((acc, r) => 
        acc + (r.productividad.actual - r.productividad.antes), 0) / restaurants.length),
      bestPerformer: restaurants.reduce((best, current) => 
        current.productividad.actual > best.productividad.actual ? current : best),
      totalCostOptimization: restaurants.reduce((acc, r) => 
        acc + (r.indicadoresSalida.optimizacionCostos.antes - r.indicadoresSalida.optimizacionCostos.actual), 0).toFixed(1)
    };

    const performanceData = restaurants.map(restaurant => ({
      name: restaurant.name.split(' ').slice(0, 2).join(' '),
      productividadAntes: restaurant.productividad.antes,
      productividadActual: restaurant.productividad.actual,
      mejora: restaurant.productividad.actual - restaurant.productividad.antes
    }));

    const radarData = Object.keys(indicatorConfig).map(key => ({
      indicator: indicatorConfig[key].name,
      antes: calculateAverage(restaurants, `indicadoresSalida.${key}.antes`),
      actual: calculateAverage(restaurants, `indicadoresSalida.${key}.actual`),
      meta: calculateAverage(restaurants, `indicadoresSalida.${key}.meta`)
    }));

    const comparisonData = [
      { categoria: 'Calidad', antes: 46, actual: 71 },
      { categoria: 'Impacto Ambiental', antes: 80, actual: 100 },
      { categoria: 'Optimización Costos', antes: 66, actual: 55 },
      { categoria: 'Generación Ingresos', antes: 55, actual: 67 },
      { categoria: 'Eficiencia Mant.', antes: 10, actual: 67 },
      { categoria: 'Procedimientos', antes: 12, actual: 67 },
      { categoria: 'Capacitación', antes: 22, actual: 44 }
    ];

    const timelineData = [
      { mes: "Ene", promedio: 52 }, { mes: "Feb", promedio: 55 }, { mes: "Mar", promedio: 58 },
      { mes: "Abr", promedio: 61 }, { mes: "May", promedio: 64 }, { mes: "Jun", promedio: 66 },
      { mes: "Jul", promedio: 68 }, { mes: "Ago", promedio: 70 }, { mes: "Sep", promedio: 71 },
      { mes: "Oct", promedio: 72 }, { mes: "Nov", promedio: 73 }
    ];

    return { systemIndicators, performanceData, radarData, comparisonData, timelineData };
  }, [restaurants]);

  // Componentes reutilizables
  const StatCard = ({ title, value, change, icon: Icon, color, suffix = "", subtitle, isReverse = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon className={`w-5 h-5 ${color}`} />
            <p className="text-gray-600 text-sm font-medium">{title}</p>
          </div>
          <p className="text-3xl font-bold text-gray-900">{value}{suffix}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          {change && (
            <div className="flex items-center mt-2">
              <TrendingUp className={`w-4 h-4 mr-1 ${
                isReverse ? 
                  (change < 0 ? 'text-green-500' : 'text-red-500 transform rotate-180') :
                  (change > 0 ? 'text-green-500' : 'text-red-500 transform rotate-180')
              }`} />
              <span className={`text-sm font-medium ${
                isReverse ? 
                  (change < 0 ? 'text-green-500' : 'text-red-500') :
                  (change > 0 ? 'text-green-500' : 'text-red-500')
              }`}>
                {Math.abs(change)}
              </span>
              <span className="text-gray-500 text-sm ml-1">puntos de mejora</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  const ProductivityThermometer = ({ value, maxValue = 100 }) => {
    const percentage = (value / maxValue) * 100;
    return (
      <div className="flex items-center space-x-3">
        <div className="relative w-6 h-32 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute bottom-0 w-full transition-all duration-1000 ease-out rounded-full"
            style={{ 
              height: `${percentage}%`,
              backgroundColor: getProductivityColor(value)
            }}
          />
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{value}%</p>
          <p className="text-xs text-gray-500">Productividad</p>
        </div>
      </div>
    );
  };

  const InteractiveMap = () => {
    const [mapLoaded, setMapLoaded] = useState(false);
    
    React.useEffect(() => {
      // Cargar Leaflet dinámicamente
      const loadLeaflet = async () => {
        try {
          // Cargar CSS de Leaflet
          if (!document.querySelector('link[href*="leaflet"]')) {
            const leafletCSS = document.createElement('link');
            leafletCSS.rel = 'stylesheet';
            leafletCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
            document.head.appendChild(leafletCSS);
          }

          // Cargar JS de Leaflet
          if (!window.L) {
            await new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
              script.onload = resolve;
              script.onerror = reject;
              document.body.appendChild(script);
            });
          }

          setMapLoaded(true);
        } catch (error) {
          console.error('Error loading Leaflet:', error);
        }
      };

      loadLeaflet();
    }, []);

    React.useEffect(() => {
      if (mapLoaded && window.L) {
        // Limpiar mapa existente
        const mapContainer = document.getElementById('map-container');
        if (mapContainer) {
          mapContainer.innerHTML = '';
        }

        // Crear nuevo mapa
        const map = window.L.map('map-container', {
          center: [10.4240, -75.5520],
          zoom: 16,
          zoomControl: true
        });

        // Agregar tiles
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Agregar marcadores
        restaurants.forEach(restaurant => {
          const productivity = restaurant.productividad.actual;
          let color = "#ef4444"; // Rojo por defecto
          
          if (productivity >= 70) color = "#22c55e"; // Verde
          else if (productivity >= 60) color = "#f59e0b"; // Amarillo

          const customIcon = window.L.divIcon({
            html: `<div style="background-color: ${color}; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
                     <span style="color: white; font-size: 12px; font-weight: bold;">${Math.round(productivity)}</span>
                   </div>`,
            className: "custom-marker",
            iconSize: [25, 25],
            iconAnchor: [12, 12]
          });

          const marker = window.L.marker(restaurant.location, { icon: customIcon }).addTo(map);
          
          const popupContent = `
            <div style="padding: 8px; min-width: 200px;">
              <h3 style="font-weight: bold; font-size: 16px; margin: 0 0 8px 0;">${restaurant.name}</h3>
              <p style="color: #666; font-size: 14px; margin: 4px 0;">${restaurant.category}</p>
              <p style="font-size: 14px; margin: 4px 0;">Propietario: ${restaurant.owner}</p>
              <div style="margin-top: 8px;">
                <div style="display: flex; justify-between; font-size: 12px;">
                  <span>Productividad:</span>
                  <span style="font-weight: bold;">${restaurant.productividad.actual}%</span>
                </div>
                <div style="display: flex; justify-between; font-size: 12px;">
                  <span>Mejora:</span>
                  <span style="font-weight: bold;">+${restaurant.productividad.actual - restaurant.productividad.antes}%</span>
                </div>
              </div>
            </div>
          `;

          marker.bindPopup(popupContent);
          marker.on('click', () => setSelectedRestaurant(restaurant));
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
        <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Cargando mapa...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="h-96 rounded-lg overflow-hidden">
        <div id="map-container" className="w-full h-full"></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard de Indicadores de Salida - Centro Histórico Cartagena
          </h1>
          <p className="text-gray-600">
            Monitoreo de indicadores de calidad, impacto ambiental, costos y productividad
          </p>
        </motion.div>

        {/* Indicadores Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Restaurantes Activos"
            value={computedData.systemIndicators.totalRestaurants}
            icon={Building}
            color="text-blue-500"
            subtitle="En el programa"
          />
          <StatCard
            title="Productividad Promedio"
            value={computedData.systemIndicators.averageProductivity}
            suffix="%"
            change={computedData.systemIndicators.averageImprovement}
            icon={Thermometer}
            color="text-green-500"
            subtitle="Termómetro general"
          />
          <StatCard
            title="Mejor Desempeño"
            value={computedData.systemIndicators.bestPerformer.productividad.actual}
            suffix="%"
            icon={Award}
            color="text-purple-500"
            subtitle={computedData.systemIndicators.bestPerformer.name}
          />
          <StatCard
            title="Optimización Costos"
            value={computedData.systemIndicators.totalCostOptimization}
            suffix="%"
            icon={DollarSign}
            color="text-orange-500"
            subtitle="Reducción total"
            isReverse={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Mapa Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Ubicación y Productividad</h2>
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

          {/* Termómetro de Productividad */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Termómetro de Productividad</h2>
            <div className="grid grid-cols-3 gap-6">
              {restaurants.slice(0, 3).map((restaurant) => (
                <div key={restaurant.id} className="text-center">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    {restaurant.name.split(' ').slice(0, 2).join(' ')}
                  </h3>
                  <ProductivityThermometer value={restaurant.productividad.actual} />
                  <div className="mt-2 text-xs text-gray-500">
                    Antes: {restaurant.productividad.antes}%
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(calculateAverage(restaurants, 'productividad.antes'))}%
                  </p>
                  <p className="text-sm text-gray-500">Promedio Antes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {Math.round(calculateAverage(restaurants, 'productividad.actual'))}%
                  </p>
                  <p className="text-sm text-gray-500">Promedio Actual</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Indicadores de Salida Promedio</h2>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={computedData.radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="indicator" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Antes" dataKey="antes" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
                <Radar name="Actual" dataKey="actual" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                <Radar name="Meta" dataKey="meta" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Gráfico de Barras */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Comparación Antes vs Actual</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={computedData.comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoria" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="antes" fill="#ef4444" name="Antes" />
                <Bar dataKey="actual" fill="#22c55e" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Evolución Temporal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Evolución Productividad</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={computedData.timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="promedio" stroke="#F4A300" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Detalles del Restaurante */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {selectedRestaurant ? `Detalles: ${selectedRestaurant.name}` : "Selecciona un restaurante"}
            </h2>
            
            {selectedRestaurant ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Propietario</p>
                    <p className="font-semibold">{selectedRestaurant.owner}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Categoría</p>
                    <p className="font-semibold">{selectedRestaurant.category}</p>
                  </div>
                </div>
                
                {/* Termómetro Individual */}
                <div className="flex items-center justify-center py-4 bg-gray-50 rounded-lg">
                  <ProductivityThermometer value={selectedRestaurant.productividad.actual} />
                  <div className="ml-6">
                    <p className="text-lg font-bold text-gray-900">
                      Mejora: +{selectedRestaurant.productividad.actual - selectedRestaurant.productividad.antes}%
                    </p>
                    <p className="text-sm text-gray-500">
                      De {selectedRestaurant.productividad.antes}% a {selectedRestaurant.productividad.actual}%
                    </p>
                  </div>
                </div>

                {/* Indicadores Detallados */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Indicadores de Salida</h3>
                  <div className="space-y-3">
                    {Object.entries(selectedRestaurant.indicadoresSalida).map(([key, value]) => {
                      const config = indicatorConfig[key];
                      const isReverse = config.isReverse;
                      const progress = isReverse ? 
                        ((value.antes - value.actual) / (value.antes - value.meta)) * 100 :
                        ((value.actual - value.antes) / (value.meta - value.antes)) * 100;
                      
                      return (
                        <div key={key} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-700">
                              {config.name}
                            </span>
                            <div className="text-sm text-gray-500">
                              <span className="text-red-500">{value.antes}%</span>
                              <span className="mx-1">→</span>
                              <span className="text-green-600">{value.actual}%</span>
                              <span className="mx-1">(Meta: {value.meta}%)</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#F4A300] h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mejoras Implementadas */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Mejoras Implementadas</h3>
                  <div className="space-y-2">
                    {selectedRestaurant.mejoras.map((mejora, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{mejora}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Selecciona un restaurante para ver los detalles</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Resumen de Mejoras del Sistema */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen de Mejoras del Sistema</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-green-700">
                {((calculateAverage(restaurants, 'indicadoresSalida.reduccionManejoInadecuado.actual') / 
                   calculateAverage(restaurants, 'indicadoresSalida.reduccionManejoInadecuado.antes')) * 100 - 100).toFixed(0)}%
              </p>
              <p className="text-sm text-green-600">Mejora en Calidad</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-blue-700">
                {((calculateAverage(restaurants, 'indicadoresSalida.cumplimientoNormativo.actual') / 
                   calculateAverage(restaurants, 'indicadoresSalida.cumplimientoNormativo.antes')) * 100 - 100).toFixed(0)}%
              </p>
              <p className="text-sm text-blue-600">Mejora Ambiental</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-purple-700">
                {((calculateAverage(restaurants, 'indicadoresSalida.generacionIngresos.actual') / 
                   calculateAverage(restaurants, 'indicadoresSalida.generacionIngresos.antes')) * 100 - 100).toFixed(0)}%
              </p>
              <p className="text-sm text-purple-600">Incremento Ingresos</p>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-yellow-700">
                {((calculateAverage(restaurants, 'indicadoresSalida.eficienciaMantenimiento.actual') / 
                   Math.max(calculateAverage(restaurants, 'indicadoresSalida.eficienciaMantenimiento.antes'), 1)) * 100 - 100).toFixed(0)}%
              </p>
              <p className="text-sm text-yellow-600">Mejora Mantenimiento</p>
            </div>
          </div>

          {/* Tabla Consolidada */}
          <div className="mt-8 overflow-x-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tabla Consolidada de Indicadores</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Indicador
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Antes (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actual (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mejora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    name: "Reducción del manejo inadecuado del aceite",
                    antes: Math.round(calculateAverage(restaurants, 'indicadoresSalida.reduccionManejoInadecuado.antes')),
                    actual: Math.round(calculateAverage(restaurants, 'indicadoresSalida.reduccionManejoInadecuado.actual')),
                    meta: Math.round(calculateAverage(restaurants, 'indicadoresSalida.reduccionManejoInadecuado.meta'))
                  },
                  {
                    name: "Cumplimiento normativo y ambiental",
                    antes: Math.round(calculateAverage(restaurants, 'indicadoresSalida.cumplimientoNormativo.antes')),
                    actual: Math.round(calculateAverage(restaurants, 'indicadoresSalida.cumplimientoNormativo.actual')),
                    meta: Math.round(calculateAverage(restaurants, 'indicadoresSalida.cumplimientoNormativo.meta'))
                  },
                  {
                    name: "Termómetro de Productividad",
                    antes: Math.round(calculateAverage(restaurants, 'productividad.antes')),
                    actual: Math.round(calculateAverage(restaurants, 'productividad.actual')),
                    meta: 80
                  }
                ].map((row, index) => {
                  const mejora = row.actual - row.antes;
                  const status = getStatusBadge(row.actual, row.meta);
                  
                  return (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {row.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.antes}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.actual}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                        +{mejora}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${status.class}`}>
                          {status.text}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
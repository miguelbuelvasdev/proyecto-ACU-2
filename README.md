# OVA - Objeto Virtual de Aprendizaje
## Sistema de Gestión de Aceite de Cocina Usado

## 📋 Descripción del Proyecto

OVA (Objeto Virtual de Aprendizaje) es una plataforma educativa y de gestión para el manejo sostenible de aceite de cocina usado en restaurantes del centro histórico de Cartagena. El sistema incluye funcionalidades de capacitación, evaluación, monitoreo de indicadores ambientales y gestión administrativa a través de contenidos educativos interactivos.

## 🏗️ Arquitectura del Proyecto

### Frontend
- **Framework:** React 19.1.0 con Vite 7.0.4
- **Routing:** React Router DOM v7.7.1
- **Styling:** Tailwind CSS 3.4.0
- **Animaciones:** Framer Motion 12.23.12
- **Iconos:** Lucide React 0.525.0 + React Icons 5.5.0
- **Gráficos:** Recharts 3.1.2
- **Mapas:** React Leaflet 5.0.0 + Leaflet 1.9.4
- **Formularios:** React Hook Form 7.61.0
- **UI Components:** Headless UI React 2.2.5
- **HTTP Client:** Axios 1.11.0

### Estructura de Carpetas

```
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── public/
│   └── vite.svg
└── src/
    ├── App.css
    ├── App.jsx                     # Configuración principal de rutas
    ├── index.css                   # Estilos globales
    ├── main.jsx                    # Punto de entrada de la aplicación
    ├── assets/                     # Recursos estáticos
    │   ├── logoOVA.svg
    │   └── marimar.jpg
    ├── components/                 # Componentes reutilizables
    │   ├── auth/                   # Componentes de autenticación
    │   │   ├── LoginForm.jsx
    │   │   └── RegisterForm.jsx
    │   ├── common/                 # Componentes comunes
    │   │   ├── Footer.jsx
    │   │   ├── Header.jsx
    │   │   ├── LoadingSpinner.jsx
    │   │   └── Navbar.jsx
    │   ├── dashboard/              # Componentes del dashboard
    │   │   ├── Analytics.jsx
    │   │   ├── Charts.jsx
    │   │   └── PerformanceDashboard.jsx
    │   ├── exams/                  # Componentes de exámenes
    │   │   ├── ExamResults.jsx
    │   │   ├── FinalExam.jsx
    │   │   └── InitialExam.jsx
    │   ├── landing/                # Componentes de la página principal
    │   │   ├── FeatureCards.jsx
    │   │   └── HeroSection.jsx
    │   ├── ova/                    # Objetos Virtuales de Aprendizaje
    │   │   ├── ContentModules.jsx
    │   │   ├── InteractiveContent.jsx
    │   │   └── OvaContent.jsx
    │   └── restaurant/             # Componentes específicos de restaurantes
    │       ├── RestaurantDashboard.jsx
    │       └── RestaurantProfile.jsx
    ├── context/                    # Contextos de React
    │   ├── AuthContext.jsx         # Contexto de autenticación
    │   ├── ExamContext.jsx         # Contexto de exámenes
    │   └── RestaurantContext.jsx   # Contexto de restaurantes
    ├── hooks/                      # Hooks personalizados
    │   ├── useAuth.jsx
    │   ├── useExamData.jsx
    │   └── useLocalStorage.jsx
    ├── layouts/                    # Layouts de la aplicación
    │   ├── DashboardLayout.jsx
    │   └── MainLayout.jsx
    ├── pages/                      # Páginas principales
    │   ├── Dashboard.jsx           # Dashboard de restaurantes
    │   ├── Exams.jsx
    │   ├── ExamsPage.jsx
    │   ├── HomePage.jsx
    │   ├── LandingPage.jsx
    │   ├── Login.jsx
    │   ├── OvaModule.jsx
    │   ├── Profile.jsx
    │   ├── Register.jsx
    │   ├── ResourcesPage.jsx
    │   └── admin/                  # Páginas de administrador
    │       ├── AdminDashboard.jsx
    │       ├── AdminProfile.jsx
    │       ├── CuestionarioEducativo.jsx
    │       └── HomeAdm.jsx
    ├── styles/                     # Estilos adicionales
    │   ├── components.css
    │   └── globals.css
    └── utils/                      # Utilidades
        ├── constants.js
        ├── helpers.js
        └── validation.js
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ (recomendado Node.js 20+)
- npm 9+ o yarn 1.22+
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/miguelbuelvasdev/proyecto-ACU-2.git
cd proyecto-ACU-2/frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
Crear archivo `.env` en la raíz del proyecto:
```env
VITE_API_URL=http://localhost:3001
VITE_MAP_API_KEY=your_map_api_key
VITE_APP_NAME=OVA_ACU
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

5. **Otros scripts disponibles**
```bash
# Ejecutar linter
npm run lint

# Vista previa de la build
npm run preview

# Construir para producción
npm run build
```

### Dependencias Principales
```json
{
  "dependencies": {
    "@headlessui/react": "^2.2.5",
    "axios": "^1.11.0",
    "framer-motion": "^12.23.12",
    "leaflet": "^1.9.4",
    "lucide-react": "^0.525.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-hook-form": "^7.61.0",
    "react-icons": "^5.5.0",
    "react-leaflet": "^5.0.0",
    "react-router-dom": "^7.7.1",
    "recharts": "^3.1.2"
  },
  "devDependencies": {
    "@eslint/js": "^9.30.1",
    "@types/react": "^19.1.8",
    "@types/react-dom": "^19.1.6",
    "@vitejs/plugin-react": "^4.6.0",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.30.1",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.3.0",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.0",
    "vite": "^7.0.4"
  }
}
```

## 🎯 Funcionalidades Principales

### 👤 Sistema de Roles

#### Administrador
- Dashboard Administrativo con monitoreo general del sistema
- Gestión de Restaurantes y establecimientos
- Reportes y Analytics con indicadores de desempeño
- Gestión de Usuarios y administración de cuentas
- Configuración del Sistema y parámetros globales

#### Usuario Restaurante
- Dashboard Personal con indicadores específicos del restaurante
- Recursos Educativos y material de capacitación
- Cuestionarios de evaluación y cumplimiento
- Certificaciones y gestión de certificados
- Perfil e información del establecimiento

### 📊 Dashboard de Indicadores

El sistema incluye un dashboard completo con los siguientes indicadores:

#### Indicadores de Salida
- **Calidad:** Reducción del manejo inadecuado del aceite (46% → 71%)
- **Impacto Ambiental:** Cumplimiento normativo y ambiental (80% → 100%)
- **Costo:** Optimización de costos operativos
- **Impacto Social/Costo:** Generación de ingresos por valorización de residuos
- **Tiempo/Costo/Calidad:** Mayor eficiencia en mantenimiento preventivo
- **Seguridad/Calidad:** Aplicación de procedimientos estandarizados
- **Motivación/Seguridad/Impacto Social:** Mejora en la capacitación del personal

#### Termómetro de Productividad
Indicador visual que muestra el progreso de 58% a 71%

### 🗺️ Mapa Interactivo
- **Ubicación de Restaurantes:** Centro histórico de Cartagena
- **Marcadores Dinámicos:** Coloreados según el EcoScore
- **Información Detallada:** Popup con datos del establecimiento
- **Coordenadas Reales:** Plaza de Bolívar, Plaza de la Aduana, etc.

### 📝 Cuestionario Educativo

Sistema de evaluación con 25 ítems basados en escala de cumplimiento con puntuaciones del 1 al 5, abarcando categorías como Control de Temperatura, Filtrado y Purificación, Capacitación del Personal, Inspección Visual, Almacenamiento Adecuado, Registro y Documentación, y otras áreas clave del manejo sostenible de aceite de cocina.

## 🛣️ Sistema de Rutas

El proyecto cuenta con un sistema de rutas organizado que incluye páginas públicas, rutas de administración y rutas específicas para usuarios regulares, permitiendo navegación fluida entre las diferentes secciones del OVA.

## 🔧 Configuración de Desarrollo

### Configuración de Variables de Entorno
Crear archivo `.env` en la raíz del proyecto con las variables necesarias para la API, mapas y configuración general de la aplicación.

El proyecto utiliza configuraciones modernas de ESLint, PostCSS con Tailwind CSS, y Vite como bundler para un desarrollo eficiente.

## 🛠️ Tecnologías Utilizadas

### Frontend Stack
- **React 19.1.0** - Biblioteca de JavaScript para interfaces de usuario
- **Vite 7.0.4** - Herramienta de desarrollo rápida
- **Tailwind CSS 3.4.0** - Framework de CSS utilitario
- **TypeScript Support** - Tipado estático (configuración incluida)

### Librerías de UI/UX
- **Framer Motion 12.23.12** - Animaciones fluidas
- **Headless UI React 2.2.5** - Componentes accesibles sin estilos
- **Lucide React 0.525.0** - Iconos modernos
- **React Icons 5.5.0** - Colección amplia de iconos

### Manejo de Formularios y Datos
- **React Hook Form 7.61.0** - Manejo eficiente de formularios
- **Axios 1.11.0** - Cliente HTTP para API calls
- **React Router DOM 7.7.1** - Navegación SPA

### Visualización de Datos
- **Recharts 3.1.2** - Gráficos y charts interactivos
- **React Leaflet 5.0.0** - Mapas interactivos
- **Leaflet 1.9.4** - Biblioteca de mapas base

### Herramientas de Desarrollo
- **ESLint 9.30.1** - Linting de código
- **PostCSS + Autoprefixer** - Procesamiento de CSS
- **Vite Plugin React 4.6.0** - Integración React con Vite

## 📱 Componentes del Sistema

El proyecto está estructurado con componentes reutilizables organizados en categorías específicas: autenticación, dashboard, exámenes, contenido OVA, y componentes de restaurantes. Cada componente implementa las mejores prácticas de React con hooks modernos y manejo de estado eficiente.

## 🎨 Diseño y Estilos

El proyecto utiliza **Tailwind CSS** como framework principal de estilos, complementado con **Framer Motion** para animaciones fluidas. Se implementa una paleta de colores coherente y tipografía moderna para garantizar una experiencia de usuario óptima y accesible.

## 🔐 Sistema de Autenticación

El sistema implementa un manejo de roles flexible que permite simular diferentes tipos de usuarios para facilitar el desarrollo y testing. Incluye contextos de React para manejo de estado global de autenticación y navegación automática según el rol del usuario.

## 📊 Datos de Prueba

### Restaurantes Incluidos
- **La Cocina de María** - Plaza de Bolívar
- **Pizzería Don Luigi** - Plaza de la Aduana
- **Café Central** - Plaza de los Coches
- **Restaurante El Dorado** - Plaza de San Pedro
- **Marisquería La Perla** - Cerca del Muelle

### Indicadores por Restaurante
Cada restaurante incluye datos completos de:
- Aceite recolectado (inicial, actual, meta)
- Eficiencia energética
- Capacitación del personal
- Cumplimiento normativo
- Satisfacción del cliente
- Calidad del aceite
- Certificaciones obtenidas
- Puntaje EcoScore

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
```

El proyecto genera una build optimizada en la carpeta `dist/` con assets minificados y hasheados para cacheo eficiente. Incluye sourcemaps para debugging en producción.

## 🤝 Contribución

1. Fork el proyecto desde [https://github.com/miguelbuelvasdev/proyecto-ACU-2](https://github.com/miguelbuelvasdev/proyecto-ACU-2)
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.


import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";

// Layout Components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import LoadingSpinner from "./components/common/LoadingSpinner";
import Navbar from "./components/common/Navbar";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import ResourcesPage from "./pages/ResourcesPage";
import Dashboard from "./pages/Dashboard";
import ExamForm from "./pages/exams/ExamForm";
import ExamsPage from "./pages/ExamsPage";

// Componente temporal para páginas que aún no existen
const ComingSoon = ({ pageName }) => (
  <div className="flex items-center justify-center min-h-screen bg-neutral-dark">
    <div className="text-center">
      <h1 className="mb-4 text-4xl font-bold gradient-text-gold">{pageName}</h1>
      <p className="text-neutral-light/70">Esta página está en construcción</p>
    </div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Public Route Component
const PublicRoute = ({ children, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

// Layout wrapper component
const Layout = ({
  children,
  showHeader = true,
  showFooter = true,
  showNavbar = false, // Nueva prop
  isAuthenticated,
  user,
}) => {
  return (
    <>
      {showHeader && <Header isAuthenticated={isAuthenticated} user={user} />}
      {showNavbar && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {showFooter && <Footer />}
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          setIsAuthenticated(true);
          setUser({
            name: "Usuario Demo",
            email: "usuario@example.com",
          });
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <AuthProvider>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes sin Navbar */}
            <Route
              path="/"
              element={
                <Layout showHeader={false} showFooter={false}>
                  <LandingPage />
                </Layout>
              }
            />

            <Route
              path="/login"
              element={
                <Layout showHeader={false} showFooter={false}>
                  <Login />
                </Layout>
              }
            />

            <Route
              path="/register"
              element={
                <Layout showHeader={false} showFooter={false}>
                  <Register />
                </Layout>
              }
            />

            {/* Rutas con Navbar */}
            <Route
              path="/home"
              element={
                <Layout showHeader={false} showFooter={false} showNavbar={true}>
                  <HomePage />
                </Layout>
              }
            />

            <Route
              path="/resources"
              element={
                <Layout showHeader={false} showFooter={false} showNavbar={true}>
                  <ResourcesPage />
                </Layout>
              }
            />

            <Route
              path="/exams"
              element={
                <Layout showHeader={false} showFooter={false} showNavbar={true}>
                  <ExamsPage />
                </Layout>
              }
            />

            <Route
              path="/dashboard"
              element={
                <Layout showHeader={false} showFooter={false} showNavbar={true}>
                  <Dashboard />
                </Layout>
              }
            />

            <Route
              path="/profile"
              element={
                <Layout showHeader={false} showFooter={false} showNavbar={true}>
                  <ComingSoon pageName="Perfil" />
                </Layout>
              }
            />

            <Route
              path="/settings"
              element={
                <Layout showHeader={false} showFooter={false} showNavbar={true}>
                  <ComingSoon pageName="Configuración" />
                </Layout>
              }
            />

            <Route
              path="/about"
              element={
                <Layout isAuthenticated={isAuthenticated} user={user}>
                  <ComingSoon pageName="Acerca de" />
                </Layout>
              }
            />

            <Route
              path="/exam_form/:id/:title"
              element={
                <Layout
                  showHeader={false}
                  showFooter={false}
                  showNavbar={true}
                  isAuthenticated={isAuthenticated}
                  user={user}
                >
                  <ExamForm />
                </Layout>
              }
            />

            {/* 404 Route */}
            <Route
              path="*"
              element={
                <Layout isAuthenticated={isAuthenticated} user={user}>
                  <ComingSoon pageName="404 - Página no encontrada" />
                </Layout>
              }
            />
          </Routes>
        </AnimatePresence>
      </AuthProvider>
    </Router>
  );
}

export default App;

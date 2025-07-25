import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';

// Layout Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';

// Pages - Importa solo las que existen
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import ResourcesPage from './pages/ResourcesPage'; 


// Componente temporal para páginas que aún no existen
const ComingSoon = ({ pageName }) => (
  <div className="min-h-screen bg-neutral-dark flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold gradient-text-gold mb-4">{pageName}</h1>
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
const Layout = ({ children, showHeader = true, showFooter = true, isAuthenticated, user }) => {
  return (
    <>
      {showHeader && <Header isAuthenticated={isAuthenticated} user={user} />}
      <main className="min-h-screen">
        {children}
      </main>
      {showFooter && <Footer />}
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser ] = useState(null);

  useEffect(() => {
    // Simulate checking authentication status
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          setIsAuthenticated(true);
          setUser ({
            name: 'Usuario Demo',
            email: 'usuario@example.com'
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
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
            {/* Public Routes */}
            <Route 
              path="/" 
              element={
                <Layout showHeader={false} showFooter={false} isAuthenticated={isAuthenticated} user={user}>
                  <LandingPage />
                </Layout>
              } 
            />
            
            <Route 
              path="/login" 
              element={
                <PublicRoute isAuthenticated={isAuthenticated}>
                  <Layout showHeader={false} showFooter={false}>
                    <Login />
                  </Layout>
                </PublicRoute>
              } 
            />
            
            <Route 
              path="/register" 
              element={
                <PublicRoute isAuthenticated={isAuthenticated}>
                  <Layout showHeader={false} showFooter={false}>
                    <Register />
                  </Layout>
                </PublicRoute>
              } 
            />

            <Route 
              path="/home" 
              element={
                <PublicRoute isAuthenticated={isAuthenticated}>
                  <Layout showHeader={false} showFooter={false}>
                    <HomePage />
                  </Layout>
                </PublicRoute>
              } 
            />

            <Route 
              path="/resources" 
              element={
                <PublicRoute isAuthenticated={isAuthenticated}>
                  <Layout showHeader={false} showFooter={false}>
                    <ResourcesPage />
                  </Layout>
                </PublicRoute>
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

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Layout isAuthenticated={isAuthenticated} user={user}>
                    <ComingSoon pageName="Dashboard" />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            
            {/* <Route 
              path="/resources" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Layout isAuthenticated={isAuthenticated} user={user} showHeader={false} showFooter={true}>
                    <ResourcesPage />
                  </Layout>
                </ProtectedRoute>
              } 
            /> */}

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

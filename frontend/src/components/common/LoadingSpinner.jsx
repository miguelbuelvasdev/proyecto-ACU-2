import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        className="w-16 h-16 border-4 border-t-4 border-primary-gold rounded-full animate-spin"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <p className="mt-4 text-lg text-neutral-light">Cargando...</p>
    </div>
  );
};

export default LoadingSpinner;

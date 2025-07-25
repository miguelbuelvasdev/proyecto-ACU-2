import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { Sparkles, Leaf, Award } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-neutral-dark overflow-hidden relative">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-accent-purple/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-gold/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/10 rounded-full filter blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Icons */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-accent-blue to-accent-purple rounded-xl flex items-center justify-center shadow-glow-blue opacity-20"
      >
        <Sparkles className="w-8 h-8 text-white" />
      </motion.div>
      
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-br from-primary-gold to-orange-500 rounded-xl flex items-center justify-center shadow-glow-gold opacity-20"
      >
        <Leaf className="w-8 h-8 text-white" />
      </motion.div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block"
            >
              <div className="mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center space-x-2 mb-6"
                >
                  <div className="w-10 h-10 bg-gradient-gold rounded-full animate-pulse"></div>
                  <span className="text-2xl font-bold gradient-text-gold">EcoAceite</span>
                </motion.div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="gradient-text-gold">Únete a la</span>
                <br />
                <span className="text-neutral-light">Revolución</span>
                <br />
                <span className="gradient-text-blue">Sostenible</span>
              </h1>

              <p className="text-xl text-neutral-light/80 mb-8">
                Registra tu restaurante y comienza tu viaje hacia una cocina más ecológica y rentable.
              </p>

              {/* Benefits */}
              <div className="space-y-4">
                {[
                  { icon: <Award className="w-5 h-5" />, text: "Certificación oficial en sostenibilidad" },
                  { icon: <Leaf className="w-5 h-5" />, text: "Reduce tu impacto ambiental" },
                  { icon: <Sparkles className="w-5 h-5" />, text: "Acceso a contenido exclusivo" }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-10 h-10 bg-primary-gold/20 rounded-lg flex items-center justify-center text-primary-gold">
                      {benefit.icon}
                    </div>
                    <span className="text-neutral-light/70">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-12 grid grid-cols-3 gap-4"
              >
                {[
                  { value: "500+", label: "Restaurantes" },
                  { value: "95%", label: "Satisfacción" },
                  { value: "24/7", label: "Soporte" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold gradient-text-gold">{stat.value}</div>
                    <div className="text-sm text-neutral-light/60">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <RegisterForm currentStep={currentStep} setCurrentStep={setCurrentStep} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

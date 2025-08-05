import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen">
      {/* Usar directamente RegisterForm que ya tiene su propio layout completo */}
      <RegisterForm currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </div>
  );
};

export default Register;
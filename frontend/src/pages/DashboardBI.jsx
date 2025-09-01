import React from "react";
import { motion } from "framer-motion";

export const DashboardBI = () => {
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="px-12 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-white border border-gray-100 shadow-lg rounded-3xl"
        >
          <div className="flex items-center justify-center h-[80vh]">
            <iframe
              title="Dashboard_V1"
              src="https://app.powerbi.com/view?r=eyJrIjoiM2Q2NjMwMTMtYWQ0MC00YTQ4LTg2MTMtZDlmZjgwNTA0YzJlIiwidCI6ImY0MDc2ZjQxLWE2M2MtNGVmMy04ZWFmLTc1ZTE2N2FlNzY4NCIsImMiOjR9&pageName=6e4469c690a0d9013425"
              frameBorder="0"
              allowFullScreen={true}
              style={{ width: "2000px", height: "80vh" }}
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

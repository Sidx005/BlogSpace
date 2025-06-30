import React from 'react';
import { motion } from 'framer-motion';

const HomeChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      // viewport={{ once: true }}
      className="min-h-72 border-indigo-300/50 shadow-2xl shadow shadow-blue-800 border-t rounded-t-4xl p-10 gap-10 flex flex-col justify-center items-center"
      style={{ boxShadow: 'inset 0 4px 20px rgba(59, 130, 246, 0.5)' }}

    >
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 12, delay: 0.2 }}
        // viewport={{ once: true }}
        className="text-4xl mb-3 font-bold"
      >
        Space Analytics
      </motion.h1>

      <motion.div
        // src="https://mavenanalyticsio-upload-bucket-prod.s3.us-west-2.amazonaws.com/181994400/projects/220beffd-d2f4-4324-8b01-9ff774d324ca.png"
     
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 10, delay: 0.8 }}
        // viewport={{ once: true }}
        className="w-[50vw] bg-white object-cover rounded-lg shadow-xl"
      >
        <img    src='/Chart.png'
        alt="Space Chart"  className="h-full w-full object-cover" />
    </motion.div>
    </motion.div>
  );
};

export default HomeChart;

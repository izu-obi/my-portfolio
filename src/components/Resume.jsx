import React from 'react';
import { motion } from 'framer-motion';

export const Resume = () => (
  <section className="py-16 px-4">
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} className="text-center">
      <h2 className="text-3xl font-bold mb-6">Resume</h2>
      <a href="../files/MyCV.pdf" target="_blank" rel="noopener" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Download Resume
      </a>
    </motion.div>
  </section>
);
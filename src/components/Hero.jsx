import React from 'react';
import { motion } from 'framer-motion';

export const Hero = () => (
  <section className="h-screen w-[50%] flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold mb-4">Hello, I'm Izu</h1>
      <p className="mb-6">I'm a web developer who loves building clean, user-friendly web applications. I have a strong foundation in software development and I’m always excited to take on new challenges and grow as a developer. Welcome to my portfolio!</p>
      <a href="#projects" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">View Projects</a>
    </motion.div>
  </section>
);
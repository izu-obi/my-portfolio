import React from 'react';
import { motion } from 'framer-motion';

export const Home = () => (
  <section className="h-screen w-full flex flex-col items-center justify-center text-center">
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center"
    >
      {/* Enlarged Profile Picture */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mb-6 w-55 h-55 rounded-full overflow-hidden border-4 border-white shadow-lg"
      >
        <img 
          src="/images/profile2.jpg"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Main Content */}
      <h1 className="text-4xl font-bold mb-4">Hello, I'm Izu</h1>
      <p className="mb-6 max-w-xl">
        I'm a web developer who loves building clean, user-friendly web applications. I have a strong foundation in software development and I'm always excited to take on new challenges and grow as a developer. Welcome to my portfolio!
      </p>
      <a href="#projects" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        View Projects
      </a>
    </motion.div>
  </section>
);

import React from 'react';
import { motion } from 'framer-motion';

export const Home = () => (
  <section
    id="home"
    className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 text-center"
  >
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center"
    >
      {/* Responsive Profile Picture */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mb-6 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-lg"
      >
        <img 
          src="/images/profile.jpg"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Responsive Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
        Hello, I'm Izu
      </h1>

      {/* Responsive Paragraph */}
      <p className="mb-6 max-w-xl text-base sm:text-lg text-gray-600 dark:text-gray-300">
        I'm a web developer who loves building clean, user friendly web applications.
        I have a strong foundation in software development and I'm always excited to take on new
        challenges and grow as a developer. Welcome to my portfolio!
      </p>

      {/* CTA Button */}
      <a
        href="#projects"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
      >
        View Projects
      </a>
    </motion.div>
  </section>
);


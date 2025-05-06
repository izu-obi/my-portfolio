import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaWhatsapp, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';

export const Contact = () => (
  <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-xl mx-auto"
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Contact Me</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side - Contact Info */}
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <a 
              href="mailto:izuobi25@gmail.com" 
              className="text-blue-600 dark:text-blue-400"
            >
              izuobi25@gmail.com
            </a>
          </div>
          
          <div className="flex items-center space-x-3">
            <FaPhone className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <a 
              href="tel:+2348071371103" 
              className="text-blue-600 dark:text-blue-400"
            >
              +234 807 137 1103
            </a>
          </div>
        </div>

        {/* Right Side - Social Media */}
        <div className="flex flex-col items-center md:items-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Connect with me</h3>
          <div className="flex space-x-4">
            <motion.a
              href="https://www.linkedin.com/in/izuchukwu-obi-96a60a2a9"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <FaLinkedin size={20} />
            </motion.a>
            
            <motion.a
              href="https://wa.me/2348071371103"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
            >
              <FaWhatsapp size={20} />
            </motion.a>
            
            <motion.a
              href="https://github.com/izu-obi"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-gray-800 hover:text-black dark:text-gray-200 dark:hover:text-white"
            >
              <FaGithub size={20} />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

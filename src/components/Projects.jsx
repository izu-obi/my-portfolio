import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  { title: 'National Teachers Institute', description: 'Collaboratively built with HTML/CSS/Bootstrap during my Omniswift internship. This responsive platform enables 5,000+ Nigerian teachers annually to upgrade qualifications via distance learning. I developed WCAG-compliant pages optimized for low-bandwidth access, addressing nationwide teacher shortages while professionalizing education.', image: '../images/nti.png', link: 'https://www.nti.edu.ng/' },
  { title: 'Electrify', description: 'A React/Tailwind CSS academic project demonstrating my frontend capabilities. As my first independent build, it features component based architecture and responsive design, marking my transition to professional grade development.', image: '../images/electrify.png', link: 'https://electrify-five.vercel.app/' },
  { title: 'Discovery Circle Professionals (DCP)', description: 'Collaboratively built a React/JavaScript/Tailwind CSS platform for this global consultancy network. The responsive site showcases their cross-sector expertise through dynamic content presentation, reflecting their agile approach to solving complex challenges while enabling their strategic expansion.', image: '../images/dcp.png', link: 'https://dcp.com.ng/' },
  { title: 'Abis Group', description: 'This was my fourth project. It was developed with a fellow frontend developer', image: '../images/abis.png', link: 'https://www.abisgroup.africa/index.html' },
];

export const Projects = () => (
  <section className="py-16 px-4 bg-gray-100 dark:bg-gray-800">
    <h2 className="text-3xl font-bold text-center mb-10">Projects</h2>
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {projects.map((proj, idx) => (
        <motion.div key={idx} whileHover={{ scale: 1.05 }} className="bg-white dark:bg-gray-700 p-4 rounded shadow">
          <img src={proj.image} alt={proj.title} className="w-full h-48 object-cover rounded mb-4" />
          <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
          <p className="mb-4 text-sm">{proj.description}</p>
          <a href={proj.link} className="text-blue-600 hover:underline">View Project</a>
        </motion.div>
      ))}
    </div>
  </section>
);
import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  { title: 'National Teachers Institute', description: 'Co-developed a responsive HTML/CSS/Bootstrap platform during my Omniswift internship, supporting over 5,000 Nigerian teachers annually in upgrading their qualifications via distance learning. Built WCAG compliant, low-bandwidth-optimized pages to help address nationwide teacher shortages and advance education professionalization.', image: '../images/nti.png', link: 'https://www.nti.edu.ng/' },
  { title: 'Electrify', description: 'A React/Tailwind CSS academic project demonstrating my frontend capabilities. As my first independent build, it features component based architecture and responsive design, marking my transition to professional grade development.', image: '../images/electrify.png', link: 'https://electrify-five.vercel.app/' },
  { title: 'Discovery Circle Professionals (DCP)', description: 'Co-developed a responsive React/JavaScript/Tailwind CSS platform for a global consultancy network, dynamically showcasing cross-sector expertise and supporting strategic growth through agile, content driven design.', image: '../images/dcp.png', link: 'https://dcp.com.ng/' },
  { title: 'Abis Group', description: 'Enhanced the existing website for ABIS Group—a leading livestock processing company in Nigeria—by implementing smooth animations and UI improvements to elevate user engagement. Contributed to presenting their premium-grade offerings and growth vision through a more dynamic and polished digital experience.', image: '../images/abis.png', link: 'https://www.abisgroup.africa/index.html' },
  { title: 'MECA Group', description: "Redesigned and optimized the MECA company website to deliver a cleaner, faster, and more engaging user experience. Introduced modern animations and improved interface responsiveness across devices. The updated design better communicates the brand's agricultural focus and high-quality livestock services, helping the company present a more professional and trustworthy online presence.", image: '../images/meca.png', link: 'https://meca.com.ng/' },
];

export const Projects = () => (
  <section id='projects' className="py-16 px-4">
    <h2 className="text-3xl font-bold text-center mb-10">Projects</h2>
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {projects.map((proj, idx) => (
        <motion.div key={idx} whileHover={{ scale: 1.05 }} className="bg-white dark:bg-gray-700 p-4 rounded shadow text-left">
          <img src={proj.image} alt={proj.title} className="w-full h-48 object-cover rounded mb-4" />
          <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
          <p className="mb-4 text-sm ">{proj.description}</p>
          <a href={proj.link} target='_blank' className="text-blue-600 hover:underline">View Project</a>
        </motion.div>
      ))}
    </div>
  </section>
);
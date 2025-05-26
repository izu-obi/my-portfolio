import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { Menu, X } from 'lucide-react'; // optional

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ['home', 'projects', 'resume', 'contact'];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">My Portfolio</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item}
              to={item}
              smooth={true}
              duration={500}
              className="cursor-pointer capitalize text-gray-700 dark:text-white hover:text-blue-600"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-800 dark:text-white">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Side Drawer for Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Menu</h2>
          <button onClick={closeMenu} className="text-gray-800 dark:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col p-4 space-y-6">
          {navItems.map((item) => (
            <Link
              key={item}
              to={item}
              smooth={true}
              duration={500}
              onClick={closeMenu}
              className="capitalize cursor-pointer text-gray-700 dark:text-white hover:text-blue-600"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Background overlay when drawer is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={closeMenu}
        ></div>
      )}
    </nav>
  );
};

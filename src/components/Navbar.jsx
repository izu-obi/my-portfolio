import React, { useState } from 'react';
import { Link } from 'react-scroll';

export const Navbar = () => {

  return (
    <nav className="fixed top-0 w-full bg-white dark:bg-gray-800 shadow z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">My Portfolio</h1>
        <div className="flex items-center gap-4">
          {['home', 'projects', 'resume', 'contact'].map((item) => (
            <Link key={item} to={item} smooth duration={500} className="cursor-pointer">
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
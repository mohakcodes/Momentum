import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-purple-600 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-white text-2xl font-bold tracking-wide">
              Momentum
            </h1>
          </div>
          <div className="space-x-4">
            <a
              href="#"
              className="text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-white hover:bg-purple-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
            >
              Profile
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
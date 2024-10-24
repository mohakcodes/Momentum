"use client"
import React, { useState } from 'react';
import Link from 'next/link'
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-green-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div>
            <h1 className="text-white font-londrinaSolid text-3xl font-medium tracking-wide">
              Momentum
            </h1>
          </div>
          <div className="sm:flex hidden space-x-2 md:space-x-4">
            <Link
              href='/about'
              className="text-white hover:bg-green-900 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
            >
              About Us
            </Link>
            <Link
              href='/shop'
              className="text-white hover:bg-green-900 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
            >
              Shop Features
            </Link>
            <Link
              href='/profile'
              className="text-white hover:bg-green-900 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
            >
              Profile
            </Link>
          </div>
          <div className="flex sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-green-500 focus:outline-none"
            >
              {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="sm:hidden flex flex-col space-y-2 mt-2 mb-3">
            <Link
              href='/about'
              className="text-white hover:bg-green-900 bg-green-600 hover:text-white px-3 py-1 rounded-md text-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              href='/shop'
              className="text-white hover:bg-green-900 bg-green-600 hover:text-white px-3 py-1 rounded-md text-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              Shop Features
            </Link>
            <Link
              href='/profile'
              className="text-white hover:bg-green-900 bg-green-600 hover:text-white px-3 py-1 rounded-md text-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
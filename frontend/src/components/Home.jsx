import React from 'react'
import Calendar from '../assets/cal1.png'
import { Link, useNavigate } from 'react-router'

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-12 min-h-[calc(100vh-4rem)]">
      <img
        src={Calendar}
        alt="Calendar habit tracker"
        className="w-48 md:w-56 lg:w-64 drop-shadow-xl hover:scale-103 transition-transform duration-300"
      />

      <div className="text-center md:text-left max-w-md space-y-4">
        <h1 className="text-5xl font-londrina text-green-800">
          Welcome to Momentum
        </h1>
        <div>
          <p className="text-md font-poppins text-green-900">
          Create habit rooms, track your daily progress, and build unstoppable streaks.
          </p>
          <p className="text-md font-poppins text-green-900">
            Stay motivated, earn rewards, and transform your life.
          </p>
        </div>
        <Link
          to="/rooms"
          className="inline-block bg-green-700 hover:bg-green-800 font-poppins text-green-100 py-3 px-6 rounded-xl shadow-md transition-colors duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}

export default Home
import Image from 'next/image';
import React from 'react';
import Calender from '@/assets/calender.png'
import Link from 'next/link';

const About = () => {
  return (
    <div className="flex w-full justify-center items-center font-semibold gap-2 py-10 mt-10 sm:mt-16">
      <div className='flex flex-col sm:flex-row items-center gap-6 sm:gap-12'>
        <div className='w-36 sm:w-56 h-36 sm:h-56 relative'>
          <Image
            src={Calender}
            alt="Momentum"
            layout="fill"
            objectFit="cover"
            className="rounded-xl shadow-md"
          />
        </div>

        <div className='text-center sm:text-left gap-3'>
          <h1
            className="text-5xl sm:text-6xl ml-1 mb-2 font-londrinaSolid font-bold text-green-800 relative animate-float"
          >
            Momentum
          </h1>
          <p className="text-lg sm:text-xl mt-2 font-interTight font-bold text-gray-700">Set Goal, Create Room, Iterate</p>
          <p className="text-lg sm:text-xl mb-6 font-interTight font-bold text-gray-700">Build habits faster in 21 days</p>
          <Link
            href='/login'
            className="px-6 py-3 bg-green-800 text-white rounded-lg shadow-lg hover:bg-green-900 transition-all"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;

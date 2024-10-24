import About from '@/app/components/About'
import React from 'react'

const page = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 via-green-100 to-green-300'>
      <About />
    </div>
  );
}

export default page
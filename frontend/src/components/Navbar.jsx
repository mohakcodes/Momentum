import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  const [isToggle, setIsToggle] = useState(false)

  const toggleMenu = () => setIsToggle(prev => !prev)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-green-800 shadow-md">
      <div className="flex justify-between items-center px-5 py-3">
        <Link to="/" className="font-londrina font-normal text-4xl text-white">
          Momentum
        </Link>

        {/* Desktop Links */}
        <ul className="hidden sm:flex gap-4 text-lg font-opensans text-green-200">
          <li><Link to="/" className="hover:text-green-100">Home</Link></li>
          <li><Link to="/rooms" className="hover:text-green-100">Rooms</Link></li>
          <li><Link to="/profile" className="hover:text-green-100">Profile</Link></li>
          <li><button className="hover:text-green-100">Logout</button></li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="sm:hidden relative">
          <button onClick={toggleMenu} className="text-green-100">
            {isToggle ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Dropdown Box */}
          {isToggle && (
            <div className="absolute right-0 mt-2 w-40 bg-green-700 border border-green-600 rounded-lg shadow-md py-2 flex flex-col text-green-100 text-base font-opensans z-50">
              <Link to="/" onClick={toggleMenu} className="px-4 py-2 hover:bg-green-600 rounded-md">Home</Link>
              <Link to="/rooms" onClick={toggleMenu} className="px-4 py-2 hover:bg-green-600 rounded-md">Rooms</Link>
              <Link to="/profile" onClick={toggleMenu} className="px-4 py-2 hover:bg-green-600 rounded-md">Profile</Link>
              <button className="text-left px-4 py-2 hover:bg-green-600 rounded-md">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

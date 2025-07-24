import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, matchPath } from 'react-router'
import useThemeStore from '../store/useThemeStore'

const Navbar = () => {
  const [isToggle, setIsToggle] = useState(false)
  const location = useLocation()
  const { theme, themeConfig } = useThemeStore()

  const isSingleRoomPage = matchPath('/room/:id', location.pathname)
  const currentTheme = themeConfig[theme]

  const navbarBg = isSingleRoomPage
    ? currentTheme?.navbarBgGradient || 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700'
    : 'bg-gradient-to-r from-green-200 via-green-100 to-green-200'

  const fontColor = isSingleRoomPage
    ? currentTheme?.navFontColor || 'text-white'
    : 'text-green-800'

  const toggleMenu = () => setIsToggle(prev => !prev)

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${navbarBg} shadow-lg`}>
      <div className="flex justify-between items-center px-5 py-3">
        <Link to="/" className={`font-londrina font-normal text-4xl ${fontColor}`}>
          Momentum
        </Link>

        {/* Desktop Links */}
        <ul className={`hidden sm:flex gap-4 text-lg font-opensans ${fontColor}`}>
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/rooms" className="hover:underline">Rooms</Link></li>
          <li><Link to="/profile" className="hover:underline">Profile</Link></li>
          <li><button className="hover:underline">Logout</button></li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="sm:hidden relative">
          <button onClick={toggleMenu} className="text-white">
            {isToggle ? <X size={28} /> : <Menu size={28} />}
          </button>

          {isToggle && (
            <div className="absolute right-0 mt-2 w-40 bg-opacity-90 bg-slate-900 border border-slate-600 rounded-lg shadow-md py-2 flex flex-col text-white text-base font-opensans z-50">
              <Link to="/" onClick={toggleMenu} className="px-4 py-2 hover:bg-slate-800 rounded-md">Home</Link>
              <Link to="/rooms" onClick={toggleMenu} className="px-4 py-2 hover:bg-slate-800 rounded-md">Rooms</Link>
              <Link to="/profile" onClick={toggleMenu} className="px-4 py-2 hover:bg-slate-800 rounded-md">Profile</Link>
              <button className="text-left px-4 py-2 hover:bg-slate-800 rounded-md">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

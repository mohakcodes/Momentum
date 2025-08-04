import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, matchPath, useNavigate } from 'react-router'
import useThemeStore from '../store/useThemeStore'
import useUserStore from '../store/useUserStore'
import api from '../utils/axios'

const Navbar = () => {
  const [isToggle, setIsToggle] = useState(false)
  const location = useLocation()

  const navigate = useNavigate()
  const { user, clearUser } = useUserStore()
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

  const handleLogout = async() => {
    try {
      await api.post('/auth/logout')
      sessionStorage.removeItem('access_token')
      localStorage.removeItem('momentum-user')
      clearUser()
      navigate('/')
    } 
    catch (err) {
      console.error('Logout failed:', err)
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${navbarBg} shadow-lg`}>
      <div className="flex justify-between items-center px-5 py-3">
        <Link to="/" className={`font-londrina font-normal text-4xl ${fontColor}`}>
          Momentum
        </Link>

        {/* Desktop Links */}
        <ul className={`hidden sm:flex gap-4 text-lg font-opensans ${fontColor}`}>
          <li><Link to="/" className="hover:underline">Home</Link></li>
          {
            user ? (
              <>
                <li><Link to="/rooms" className="hover:underline">Rooms</Link></li>
                <li><Link to="/store" className="hover:underline">Store</Link></li>
                <li className="flex items-center gap-1">
                  <Link to="/profile" className="hover:underline">Profile</Link>
                  {user?.xp !== undefined && (
                    <span className="bg-yellow-300 text-yellow-900 px-2 py-0.5 rounded-full text-sm font-semibold">
                      {user.xp} XP
                    </span>
                  )}
                </li>
                <li>
                  <button
                    onClick={handleLogout} 
                    className="hover:underline"
                    >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button 
                  onClick={() => navigate('/auth')}
                  className="hover:underline"
                >
                  Login
                </button>
              </li>
            )
          }
        </ul>

        {/* Mobile Menu Button */}
        <div className="sm:hidden relative">
          <button onClick={toggleMenu} className="text-green-700">
            {isToggle ? <X size={28} /> : <Menu size={28} />}
          </button>

          {isToggle && (
            <div className="absolute right-0 mt-2 w-40 bg-opacity-90 bg-slate-900 border border-slate-600 rounded-lg shadow-md py-2 flex flex-col text-white text-base font-opensans z-50">
              <Link to="/" onClick={toggleMenu} className="px-4 py-2 hover:bg-slate-800 rounded-md">Home</Link>
              {
                user ? (
                  <>
                    <Link to="/rooms" onClick={toggleMenu} className="px-4 py-2 hover:bg-slate-800 rounded-md">Rooms</Link>
                    <Link to="/store" onClick={toggleMenu} className="px-4 py-2 hover:bg-slate-800 rounded-md">Store</Link>
                    <Link to="/profile" onClick={toggleMenu} className="px-4 py-2 hover:bg-slate-800 rounded-md">Profile</Link>
                    {user && (
                      <div className="px-4 text-md font-semibold py-2 text-green-300 border-b border-slate-600">
                        Coins: <span className="font-semibold text-yellow-300">{user.xp}</span>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }} 
                      className="text-left px-4 py-2 hover:bg-slate-800 rounded-md"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      navigate('/auth')
                      toggleMenu()
                    }}
                    className="text-left px-4 py-2 hover:bg-slate-800 rounded-md"
                  >
                    Login
                  </button>
                )
              }
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

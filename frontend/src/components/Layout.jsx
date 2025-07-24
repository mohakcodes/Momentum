import useThemeStore from '../store/useThemeStore'
import { useLocation, matchPath } from 'react-router'

const Layout = ({ children }) => {

  const { theme, themeConfig } = useThemeStore();
  const location = useLocation();

  const isSingleRoomPage = matchPath('/room/:id', location.pathname);

  const bgClass = isSingleRoomPage
    ? themeConfig[theme]?.pageBg || 'bg-green-100'
    : themeConfig[theme]?.pageBgGradient || 'bg-green-100'

  return (
    <div className={`min-h-screen pt-16 font-poppins ${bgClass}`}>
      {children}
    </div>
  )
}

export default Layout;
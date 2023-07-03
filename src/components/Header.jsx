import { useAuth } from '../context/AuthContext'
import './Header.css'
import { Link } from 'react-router-dom'
import { HiOutlineLogout } from 'react-icons/hi'

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth()
  return (
    <header>
      <nav>
        {isAuthenticated ? (
          <div className="header">
            <h2>
              Bienvenid@ <span>{user}</span>!   
            </h2>
            <Link to="/" onClick={logout}>
              <HiOutlineLogout size={30}/>
              Cerrar Sesion
            </Link>
          </div>
        ) : (
          <Link to="/">Iniciar Sesion</Link>
        )}
      </nav>
    </header>
  )
}

export default Header

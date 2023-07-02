import { useAuth } from '../context/AuthContext'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth()
  return (
    <header>
      <nav>
        {isAuthenticated ? (
          <>
            Bienvenido {user}
            <Link to="/" onClick={logout}>
              Salir
            </Link>
          </>
        ) : (
          <Link to="/">
            Registrarme
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Header

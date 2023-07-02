import { useAuth } from "../context/AuthContext";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  return (
    <header>
      <nav>
        {isAuthenticated ? (
          <>
            <div>
              <h2>Bienvenido {user}</h2>
            </div>
            <div>
              <Link to="/" onClick={logout}>
                Salir
              </Link>
            </div>
          </>
        ) : (
          <Link to="/">Iniciar Sesion</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;

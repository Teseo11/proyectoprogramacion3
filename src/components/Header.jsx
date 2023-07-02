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
              Bienvenido {user}
                <Link to="/" onClick={logout}>
                  Salir
                </Link>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/registro">Registro</Link>
              </li>
            </>
          )}
        <p>{user}</p>
      </nav>
    </header>
  );
};

export default Header;

import { NavLink } from "react-router-dom";
import "./Navbar.css";
import {
  HiOutlineBuildingStorefront,
  HiOutlineUserGroup,
  HiOutlineCurrencyDollar,
  // HiOutlineReceiptPercent,
  HiOutlineHome,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { rol } = useAuth();

  const rutas = {
    Admin: [
      { path: "/inicio", label: "Inicio" },
      { path: "/productos", label: "Productos" },
      { path: "/clientes", label: "Clientes" },
      { path: "/ventas", label: "Ventas" },
      { path: "/usuarios", label: "Usuarios" },
    ],
    Empleado: [
      { path: "/inicio", label: "Inicio" },
      { path: "/productos", label: "Productos" },
      { path: "/clientes", label: "Clientes" },
      { path: "/ventas", label: "Ventas" },
    ],
    null: [{ path: "/", label: "Login" }],
  };

  const navItems = rutas[rol];

  return (
    <div className="navbar nav-container">
      <nav>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? "active-link" : null)}
              >
                {item.label == "Inicio" ? (
                  <HiOutlineHome color="#FCA311" />
                ) : (
                  ""
                )}
                {item.label == "Productos" ? (
                  <HiOutlineBuildingStorefront color="#FCA311" />
                ) : (
                  ""
                )}
                {item.label == "Clientes" ? (
                  <HiOutlineUserGroup color="#FCA311" />
                ) : (
                  ""
                )}
                {item.label == "Ventas" ? (
                  <HiOutlineCurrencyDollar color="#FCA311" />
                ) : (
                  ""
                )}
                {item.label == "Usuarios" ? (
                  <HiOutlineUserCircle color="#FCA311" />
                ) : (
                  ""
                )}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

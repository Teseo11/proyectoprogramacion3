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

const Navbar = () => {
  return (
    <div className="navbar nav-container">
      {/* <h3 className="nav-title">ni idea</h3> */}
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : null)}
            to="/"
          >
            <HiOutlineHome color="#FCA311" />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : null)}
            to="/productos"
          >
            <HiOutlineBuildingStorefront color="#FCA311" />
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : null)}
            to="/clientes"
          >
            <HiOutlineUserGroup color="#FCA311" />
            Clientes
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : null)}
            to="/ventas"
          >
            <HiOutlineCurrencyDollar color="#FCA311" />
            Ventas
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : null)}
            to="/facturas"
          >
            <HiOutlineReceiptPercent color="#FCA311" />
            Facturas
          </NavLink>
        </li> */}
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active-link" : null)}
            to="/usuarios"
          >
            <HiOutlineUserCircle color="#FCA311" />
            Usuarios
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

import { Routes, Route } from "react-router-dom";
import ClientesPage from "../pages/clientes/ClientesPage";
import ClientesForm from "../pages/clientes/ClientesForm";
import ProductosPage from "../pages/productos/ProductosPage";
import ProductosForm from "../pages/productos/ProductosForm";
import UsuariosPage from "../pages/usuarios/UsuariosPage";
import UsuariosForm from "../pages/usuarios/UsuariosForm";
import VentasPage from "../pages/ventas/VentasPage";
import VentasForm from "../pages/ventas/VentasForm";
import NotFound from "../pages/NotFound";
import Inicio from "../pages/Inicio";

import RegistroPage from "../pages/autenticacion/RegistroPage";
import LoginPage from "../pages/autenticacion/LoginPage";
import ProtectedRoutes from "../ProtectedRoutes";
import { useAuth } from "../context/AuthContext";

function ComponentsRoutes() {
  const { rol, isAuthenticated } = useAuth();
  return (
    <div className="content">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route element={<ProtectedRoutes isAllowed={isAuthenticated} />}>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/clientes/new" element={<ClientesForm />} />
          <Route path="/clientes/edit/:id" element={<ClientesForm />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/productos/new" element={<ProductosForm />} />
          <Route path="/productos/edit/:id" element={<ProductosForm />} />
          <Route path="/ventas" element={<VentasPage />} />
          <Route path="/ventas/new" element={<VentasForm />} />
          <Route path="/ventas/edit/:id" element={<VentasForm />} />
          <Route
            element={
              <ProtectedRoutes
                isAllowed={isAuthenticated && rol === "Admin"}
                redirecTo="/"
              />
            }
          >
            <Route path="/usuarios" element={<UsuariosPage />} />
            <Route path="/usuarios/new" element={<UsuariosForm />} />
            <Route path="/usuarios/edit/:id" element={<UsuariosForm />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default ComponentsRoutes;

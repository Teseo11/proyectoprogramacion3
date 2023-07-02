import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ isAllowed, redirecTo = "/" }) => {
  if (!isAllowed) return <Navigate to={redirecTo} replace />; // por esto cuando recargamos la pagina vuelve a home

  return <Outlet />;
};

export default ProtectedRoutes;

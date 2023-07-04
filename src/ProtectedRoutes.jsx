import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ isAllowed, redirecTo = "/" }) => {
  if (!isAllowed) return <Navigate to={redirecTo} replace />;

  return <Outlet />;
};

export default ProtectedRoutes;

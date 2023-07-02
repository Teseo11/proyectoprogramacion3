import ComponentsRoutes from "./ComponentsRoutes";

function Content() {
  const { rol, isAuthenticated } = useAuth();

  return <ComponentsRoutes />;
}

export default Content;

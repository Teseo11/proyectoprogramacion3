import { useEffect } from "react";
import { useEntities } from "../../context/EntitiesContext";
import UsuariosTable from "./UsuariosTable";

const UsuariosPage = () => {
  const { element, getElement } = useEntities();

  useEffect(() => {
    getElement("/usuarios");
  }, []);

  return (
    <div>
      <UsuariosTable data={element} />
    </div>
  );
};

export default UsuariosPage;

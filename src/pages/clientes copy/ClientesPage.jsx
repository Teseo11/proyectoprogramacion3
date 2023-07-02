import { useEffect } from "react";
import { useEntities } from "../../context/EntitiesContext";
import ClientesTable from "./ClientesTable";

const ClientesPage = () => {
  const { element, getElement } = useEntities();

  useEffect(() => {
    getElement("/clientes");
  }, []);

  return (
    <div>
      <ClientesTable data={element} />
    </div>
  );
};

export default ClientesPage;

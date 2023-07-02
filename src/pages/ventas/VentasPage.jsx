import { useEffect } from "react";
import { useEntities } from "../../context/EntitiesContext";
import VentasTable from "./VentasTable";

const VentasPage = () => {
  const { element, getElement } = useEntities();

  useEffect(() => {
    getElement("/ventasJoin");
  }, []);

  return (
    <div>
      <VentasTable data={element} />
    </div>
  );
};

export default VentasPage;

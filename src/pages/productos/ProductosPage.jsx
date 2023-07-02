import { useEffect } from "react";
import { useEntities } from "../../context/EntitiesContext";
import ProductosTable from "./ProductosTable";

const ProductosPage = () => {
  const { element, getElement } = useEntities();

  useEffect(() => {
    getElement("/productos");
  }, []);

  return (
    <div>
      <ProductosTable data={element} />
    </div>
  );
};

export default ProductosPage;

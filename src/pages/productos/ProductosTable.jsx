import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEntities } from "../../context/EntitiesContext";

const ProductosTable = ({ data }) => {
  const { deleteElement } = useEntities();
  return (
    <div>
      <Link to="./new" className="btn btn-primary mt-2 mb-2">
        Crear
      </Link>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((elemento) => (
            <tr key={elemento.id}>
              <td>{elemento.nombre}</td>
              <td>{elemento.categoria}</td>
              <td>{elemento.precio}</td>
              <td>{elemento.stock}</td>
              <td>
                <Link to={`./edit/${elemento.id}`}>
                  <button>Editar</button>
                </Link>
                <button
                  onClick={() => deleteElement("/productos/", elemento.id)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductosTable;

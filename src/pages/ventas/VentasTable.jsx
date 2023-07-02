import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEntities } from "../../context/EntitiesContext";

const VentasTable = ({ data }) => {
  const { deleteElement } = useEntities();
  return (
    <div>
      <Link to="./new" className="btn btn-primary mt-2 mb-2">
        Crear
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Fecha</th>
            <th>Cantidad Comprada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((elemento) => (
            <tr key={elemento.id}>
              <td>{elemento.cliente_nombre}</td>
              <td>{elemento.producto_nombre}</td>
              <td>{new Date(elemento.fecha).toLocaleDateString()}</td>
              <td>{elemento.cantidad}</td>
              <td>
                <button onClick={() => deleteElement("/ventas/", elemento.id)}>
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

export default VentasTable;

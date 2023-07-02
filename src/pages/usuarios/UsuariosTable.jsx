import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEntities } from "../../context/EntitiesContext";

const UsuariosTable = ({ data }) => {
  const { deleteElement } = useEntities();
  return (
    <div>
      <Link to="./new" className="btn btn-primary mt-2 mb-2">
        Crear
      </Link>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Username</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((elemento) => (
            <tr key={elemento.id}>
              <td>{elemento.username}</td>
              <td>{elemento.rol}</td>
              <td>
                <Link to={`./edit/${elemento.id}`}>
                  <button>Editar</button>
                </Link>
                <button
                  onClick={() => deleteElement("/usuarios/", elemento.id)}
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

export default UsuariosTable;

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEntities } from "../../context/EntitiesContext";

const ClientesForm = () => {
  const [clientes, setClientes] = useState({
    nombre: "",
    dni: "",
    correo: "",
    direccion: "",
  });

  const { getElementS, createElement, updateElement } = useEntities();

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const loadClientes = async () => {
      if (params.id) {
        const res = await getElementS("/clientes/", params.id);
        setClientes({
          nombre: res.nombre,
          dni: res.dni,
          correo: res.correo,
          direccion: res.direccion,
        });
      }
    };
    loadClientes();
  }, []);

  const handleChange = (e) => {
    setClientes({
      ...clientes,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (params.id) {
        await updateElement(`/clientes/${params.id}`, clientes);
        navigate("/clientes");
      } else {
        await createElement("/clientes", clientes);
        navigate("/clientes");
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log("pepe");
  return (
    <div>
      <h3>{params.id ? "Editar Cliente" : "Crear Cliente"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="nombre">
            Nombre:
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={clientes.nombre}
            onChange={handleChange}
            className="form-control"
          />
          <label className="form-label" htmlFor="dni">
            DNI:
          </label>
          <input
            type="text"
            name="dni"
            id="dni"
            value={clientes.dni}
            onChange={handleChange}
            className="form-control"
          />
          <label className="form-label" htmlFor="correo">
            Correo:
          </label>
          <input
            type="text"
            name="correo"
            id="correo"
            value={clientes.correo}
            onChange={handleChange}
            className="form-control"
          />
          <label className="form-label" htmlFor="direccion">
            Direccion:
          </label>
          <input
            type="text"
            name="direccion"
            id="direccion"
            value={clientes.direccion}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ClientesForm;

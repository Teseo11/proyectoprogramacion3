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
        toast.success('Cliente editado')
      } else {
        await createElement("/clientes", clientes);
        navigate("/clientes");
        toast.success('Nuevo cliente creado')
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="container w-50 mt-5">
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
            type="number"
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
            type="email"
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
        <button type="submit" className="btn btn-warning mt-2">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ClientesForm;

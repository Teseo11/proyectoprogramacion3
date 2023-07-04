import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEntities } from "../../context/EntitiesContext";

const UsuariosForm = () => {
  const [usuarios, setUsuarios] = useState({
    username: "",
    contrasenia: "",
    rol: "",
  });

  const { getElementS, createElement, updateElement } = useEntities();

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const loadUsuarios = async () => {
      if (params.id) {
        const res = await getElementS("/usuarios/", params.id);
        setUsuarios({
          username: res.username,
          contrasenia: res.contrasenia,
          rol: res.rol,
        });
      }
    };
    loadUsuarios();
  }, []);

  const handleChange = (e) => {
    setUsuarios({
      ...usuarios,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (params.id) {
        await updateElement(`/usuarios/${params.id}`, usuarios);
        navigate("/usuarios");
      } else {
        await createElement("/usuarios", usuarios);
        navigate("/usuarios");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container w-50 mt-5">
      <h3>{params.id ? "Editar Usuario" : "Crear Usuario"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={usuarios.username}
            onChange={handleChange}
            className="form-control"
          />
          <label className="form-label mt-3" htmlFor="contrasenia">
            Password:
          </label>
          <input
            type="password"
            name="contrasenia"
            id="contrasenia"
            value={usuarios.contrasenia}
            onChange={handleChange}
            className="form-control"
          />
          <label className="form-label mt-3" htmlFor="rol">
            Rol:
          </label>
          <select name="rol" onChange={handleChange} required className="form-select">
            <option value="">---</option>
            <option value="Empleado">Empleado</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-warning mt-2">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default UsuariosForm;

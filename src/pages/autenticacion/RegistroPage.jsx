import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./LogStyles.css";

const RegistroPage = () => {
  const [usuarios, setUsuarios] = useState({
    username: "",
    contrasenia: "",
    rol: "",
  });

  const { signup, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  // Si estoy autenticado no me dejara entrar en el registro
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setUsuarios({
      ...usuarios,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(usuarios);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="form-container col-lg-4 col-md-6 col-sm-8">
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                className="form-control"
                type="text"
                name="username"
                placeholder="maximo514"
                onChange={handleChange}
                value={usuarios.username}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                name="contrasenia"
                onChange={handleChange}
                value={usuarios.contrasenia}
                required
                placeholder="1234"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Rol:
              </label>
              <select name="rol" onChange={handleChange} required>
                <option value="">---</option>
                <option value="Empleado">Empleado</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Registrar
            </button>
          </form>
          <p className="create">
            Ya tienes una cuenta? <Link to="/login">Logeate!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistroPage;

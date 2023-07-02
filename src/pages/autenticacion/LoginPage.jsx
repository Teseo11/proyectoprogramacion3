import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./LogStyles.css";

const LoginPage = () => {
  const [usuarios, setUsuarios] = useState({
    username: "",
    contrasenia: "",
  });

  const { signin, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUsuarios({
      ...usuarios,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signin(usuarios);
  };

  // Si estoy autenticado no me dejara entrar en el login

  useEffect(() => {
    if (isAuthenticated) navigate("/inicio");
  }, [isAuthenticated]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="form-container col-lg-4 col-md-6 col-sm-8">
          <h2 className="text-center mb-4">Login</h2>
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
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <p className="create">
            Aun no tienes una cuenta? <Link to="/registro">Registrate!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

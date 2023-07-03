import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEntities } from "../../context/EntitiesContext";
import '../Form.css'

const ProductosForm = () => {
  const [productos, setProductos] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
  });

  const { getElementS, createElement, updateElement } = useEntities();

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const loadProductos = async () => {
      if (params.id) {
        const res = await getElementS("/productos/", params.id);
        setProductos({
          nombre: res.nombre,
          categoria: res.categoria,
          precio: res.precio,
          stock: res.stock,
        });
      }
    };
    loadProductos();
  }, []);

  const handleChange = (e) => {
    setProductos({
      ...productos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (params.id) {
        await updateElement(`/productos/${params.id}`, productos);
        navigate("/productos");
      } else {
        await createElement("/productos", productos);
        navigate("/productos");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container w-50 mt-5">
      <h3>{params.id ? "Editar Producto" : "Crear Producto"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="nombre">
            Nombre:
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={productos.nombre}
            onChange={handleChange}
            className="form-control"
          />
          <label className="form-label" htmlFor="categoria">
            Categoria:
          </label>
          <input
            type="text"
            name="categoria"
            id="categoria"
            value={productos.categoria}
            onChange={handleChange}
            className="form-control"
          />
          <label className="form-label" htmlFor="precio">
            Precio:
          </label>
          <input
            type="number"
            name="precio"
            id="precio"
            value={productos.precio}
            onChange={handleChange}
            className="form-control"
          />
          <label className="form-label" htmlFor="stock">
            Stock:
          </label>
          <input
            type="number"
            name="stock"
            id="stock"
            value={productos.stock}
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

export default ProductosForm;

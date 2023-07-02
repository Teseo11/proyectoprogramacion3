import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEntities } from "../../context/EntitiesContext";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();

const VentasForm = () => {
  const [ventas, setVentas] = useState({
    cliente: "",
    producto: "",
    fecha: `${currentYear}-${currentMonth}-${currentDay}`,
    cantidad: "",
  });
  const [optionsClientes, setOptionsClientes] = useState([]);
  const [optionsProductos, setOptionsProductos] = useState([]);

  const { getElementS, getElement, createElement } = useEntities();

  //const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    /* const loadVentas = async () => {
      if (params.id) {
        const res = await getElementS("/ventas/", params.id);
      }
      setVentas({
        cliente: "",
        producto: "",
        fecha: "", // arreglar
        cantidad: "",
      });
    }; */

    const getClientes = async () => {
      const res = await getElement("/clientes");
      setOptionsClientes(res);
    };

    const getProductos = async () => {
      const res = await getElement("/productos");
      setOptionsProductos(res);
    };

    //loadVentas();
    getClientes();
    getProductos();
  }, []);

  const handleChange = (e) => {
    setVentas({
      ...ventas,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createElement("/ventas", ventas);
      restarStock(ventas.producto, ventas.cantidad);
      navigate("/ventas");
    } catch (error) {
      console.log(error);
    }
  };

  const restarStock = async (producto, cantidad) => {
    try {
      await createElement("/sp_restar_stock", {
        producto,
        cantidad,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container w-50 mt-5">
      <h3>{"Crear Venta"}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="cliente">Clientes:</label>
        <select name="cliente" onChange={handleChange} className="form-control">
          <option value="">----</option>
          {optionsClientes.map((option, index) => (
            <option key={index} value={option.id}>
              {option.nombre}
            </option>
          ))}
        </select>
        <label htmlFor="producto">Productos</label>
        <select
          name="producto"
          id="producto"
          onChange={handleChange}
          className="form-control"
        >
          <option value="">----</option>
          {optionsProductos.map((option) => (
            <option key={option.producto_id} value={option.id}>
              {option.nombre}
            </option>
          ))}
        </select>
        <label htmlFor="cantidad">Cantidad:</label>
        <input
          type="number"
          name="cantidad"
          id="cantidad"
          value={ventas.cantidad}
          onChange={handleChange}
          className="form-control"
        />
        <button type="submit" className="btn btn-warning mt-2">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default VentasForm;

import { useState, useEffect } from "react";
import { Table, Space } from "antd";
import { Link, NavLink } from "react-router-dom";
import { useEntities } from "../../context/EntitiesContext";
import {
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineShoppingCart
} from "react-icons/hi";
import "../Table.css";

const VentasTable = () => {
  const [data, setData] = useState([]);
  const { getElement, deleteElement } = useEntities();

  useEffect(() => {
    const getVentas = async () => {
      const res = await getElement("/ventas");
      setData(
        res.map((row) => ({
          id: row.id,
          Cliente: row.cliente,
          Producto: row.producto,
          Fecha: new Date(row.fecha).toLocaleDateString(),
          Cantidad: row.cantidad,
        }))
      );
    };

    getVentas();
  }, [data]);

  const generateColumns = () => {
    if (data.length === 0) {
      return []; // No hay datos disponibles, no se generan columnas
    }

    // Obtener las claves (nombres de los campos) del primer objeto en los datos
    const keys = Object.keys(data[0]);

    // Generar las columnas dinámicamente utilizando map
    const columns = keys.map((key) => ({
      title: key, // Utilizar el nombre del campo como título de la columna
      dataIndex: key, // Utilizar el nombre del campo como dataIndex
      key, // Utilizar el nombre del campo como clave
    }));

    // Agregar las columnas de los botones de eliminar y editar
    columns.push({
      title: "Acciones",
      key: "actions",
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Link to={`./edit/${record.id}`}>
          <HiOutlinePencilAlt size={30} color="#FCA311" />
          </Link>
          <Link
            type="primary"
            danger
            onClick={() => deleteElement("/ventas/", record.id)}
          >
            <HiOutlineTrash size={30} color="#FCA311" />
          </Link>
        </Space>
      ),
    });

    return columns;
  };

  return (
    <div className="container w-75 mt-5">
      <div className="add-section">
        <NavLink to="./new">
          <HiOutlineShoppingCart size={30} color="#FCA311" />
          Añadir nueva venta
        </NavLink>
      </div>
      <Table dataSource={data} columns={generateColumns()} pagination={false} />
    </div>
  );
};

export default VentasTable;

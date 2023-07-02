import { useState, useEffect } from "react";
import { Table, Button, Space } from "antd";
import { useEntities } from "../context/EntitiesContext";
import { Link } from "react-router-dom";
const TableAnt = () => {
  const [data, setData] = useState([]);
  const { getElement, deleteElement } = useEntities();

  useEffect(() => {
    const getClientes = async () => {
      const res = await getElement("/clientes");
      console.log(res);
      setData(
        res.map((row) => ({
          nombre: row.nombre,
          dni: row.dni,
          correo: row.correo,
          direccion: row.direccion,
          cliente_id: row.cliente_id,
        }))
      );
    };

    getClientes();
  }, []);

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
          <Button
            onClick={() => (
              <Link to={`./edit/${record.cliente_id}`}>
                <button>Editar</button>
              </Link>
            )}
          >
            Editar
          </Button>
          <Button
            onClick={() => deleteElement("/clientes/", record.cliente_id)}
          >
            Eliminar
          </Button>
        </Space>
      ),
    });

    return columns;
  };

  return <Table dataSource={data} columns={generateColumns()} />;
};

export default TableAnt;

import { useState, useEffect } from "react";
import { Table, Button, Space } from "antd";
import { Link } from "react-router-dom";
import { useEntities } from "../../context/EntitiesContext";

const ClientesTable = () => {
  const [data, setData] = useState([]);
  const { getElement, deleteElement } = useEntities();

  useEffect(() => {
    const getClientes = async () => {
      const res = await getElement("/clientes");
      setData(
        res.map((row) => ({
          nombre: row.nombre,
          dni: row.dni,
          correo: row.correo,
          direccion: row.direccion,
          id: row.id,
        }))
      );
    };

    getClientes();
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
            <button>Editar</button>
          </Link>
          <Button onClick={() => deleteElement("/clientes/", record.id)}>
            Borrar
          </Button>
        </Space>
      ),
    });

    return columns;
  };

  return (
    <>
      <Link to="./new" className="btn btn-primary mt-2 mb-2">
        Crear
      </Link>
      <Table
        dataSource={data}
        columns={generateColumns()}
        pagination={{ pageSize: 5, total: 10, showSizeChanger: true }}
      />
    </>
  );
};

export default ClientesTable;

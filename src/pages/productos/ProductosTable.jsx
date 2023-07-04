import { useState, useEffect } from "react";
import { Table, Button, Space } from "antd";
import { Link } from "react-router-dom";
import { useEntities } from "../../context/EntitiesContext";
import { faTrash, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductosTable = () => {
  const [data, setData] = useState([]);
  const { getElement, deleteElement } = useEntities();

  useEffect(() => {
    const getProductos = async () => {
      const res = await getElement("/productos");
      setData(
        res.map((row) => ({
          id: row.id,
          Nombre: row.nombre,
          Categoria: row.categoria,
          Precio: row.precio,
          Stock: row.stock,
        }))
      );
    };

    getProductos();
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
            <Button>
              <FontAwesomeIcon
                icon={faPencil}
                size="xl"
                style={{ color: "#65c374" }}
              />
            </Button>
          </Link>
          <Button
            type="primary"
            danger
            onClick={() => deleteElement("/productos/", record.id)}
          >
            <FontAwesomeIcon icon={faTrash} size="xl" />
          </Button>
        </Space>
      ),
    });

    return columns;
  };

  return (
    <>
      <Link to="./new">
        <Button
          type="primary"
          style={{ margin: "10px 10px 0px 10px", height: "50px" }}
        >
          <FontAwesomeIcon icon={faPlus} beat size="2xl" />
        </Button>
      </Link>
      <Table dataSource={data} columns={generateColumns()} pagination={false} />
    </>
  );
};

export default ProductosTable;

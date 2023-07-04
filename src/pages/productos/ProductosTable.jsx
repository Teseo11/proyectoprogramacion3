import { useState, useEffect } from 'react'
import { Table, Space } from 'antd'
import { NavLink, Link } from 'react-router-dom'
import { useEntities } from '../../context/EntitiesContext'
import {
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from 'react-icons/hi'
import { HiOutlineArchiveBoxArrowDown } from 'react-icons/hi2'

const ProductosTable = () => {
  const [data, setData] = useState([])
  const { getElement, deleteElement } = useEntities()

  useEffect(() => {
    const getProductos = async () => {
      const res = await getElement('/productos')
      setData(
        res.map(row => ({
          id: row.id,
          Nombre: row.nombre,
          Categoria: row.categoria,
          Precio: row.precio,
          Stock: row.stock,
        }))
      )
    }

    getProductos()
  }, [data])

  const generateColumns = () => {
    if (data.length === 0) {
      return [] // No hay datos disponibles, no se generan columnas
    }

    // Obtener las claves (nombres de los campos) del primer objeto en los datos
    const keys = Object.keys(data[0])

    // Generar las columnas dinámicamente utilizando map
    const columns = keys.map(key => ({
      title: key, // Utilizar el nombre del campo como título de la columna
      dataIndex: key, // Utilizar el nombre del campo como dataIndex
      key, // Utilizar el nombre del campo como clave
    }))

    // Agregar las columnas de los botones de eliminar y editar
    columns.push({
      title: 'Acciones',
      key: 'actions',
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Link to={`./edit/${record.id}`}>
            <HiOutlinePencilAlt size={30} color="#FCA311" />
          </Link>
          <Link
            type="primary"
            danger
            onClick={() => deleteElement('/productos/', record.id)}
          >
            <HiOutlineTrash size={30} color="#FCA311" />
          </Link>
        </Space>
      ),
    })

    return columns
  }

  return (
    <div className="container w-75 mt-5">
      <div className="add-section">
        <NavLink to="./new">
          <HiOutlineArchiveBoxArrowDown size={30} color="#FCA311" />
          Añadir nuevo producto
        </NavLink>
      </div>
      <Table dataSource={data} columns={generateColumns()} pagination={false} />
    </div>
  )
}

export default ProductosTable

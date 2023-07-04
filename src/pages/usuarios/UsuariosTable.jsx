import { useState, useEffect } from 'react'
import { Table, Button, Space } from 'antd'
import { Link, NavLink } from 'react-router-dom'
import { useEntities } from '../../context/EntitiesContext'
import { faTrash, faPencil, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { HiOutlineUserAdd, HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'
import '../Table.css'

const UsuariosTable = () => {
  const [data, setData] = useState([])
  const { getElement, deleteElement } = useEntities()

  useEffect(() => {
    const getClientes = async () => {
      const res = await getElement('/usuarios')
      setData(
        res.map(row => ({
          id: row.id,
          Username: row.username,
          Rol: row.rol,
        }))
      )
    }

    getClientes()
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
              <HiOutlinePencilAlt size={30} color='#FCA311'/>
          </Link>
          <Link
            type="primary"
            danger
            onClick={() => deleteElement('/usuarios/', record.id)}
          >
            <HiOutlineTrash size={30} color='#FCA311'/>
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
          <HiOutlineUserAdd size={30} color='#FCA311'/>
          Añadir nuevo usuario
        </NavLink>
      </div>
      <Table dataSource={data} columns={generateColumns()} />
    </div>
  )
}

export default UsuariosTable

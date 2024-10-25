import React, { useContext, useEffect, useState } from "react";
import styles from "./user.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsPlus } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { getAllUsers } from "../../../util/api";
import { AuthContext } from "../../../context/AuthContext";

function User() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers(user.token);
      setUsers(data);
    };
    fetchUsers();
  },[]);
  const columnas = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Correo Electrónico",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Teléfono",
      selector: (row) => row.telefono,
      sortable: true,
    },
    {
      name: "Semestre",
      selector: (row) => row.semestre,
      sortable: true,
    },
    {
      name: "Código",
      selector: (row) => row.codigo,
      sortable: true,
    },
    {
      name: "Programa Académico",
      selector: (row) => row.Programa,
      sortable: true,
    },
    {
      name: "Rol",
      selector: (row) => row.isAdmin ? "Administrador" : "Usuario",
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className={styles.btns}>
          <Link className={styles.btnEdit} to={"/updateduser/"+row._id}>
            <BiEdit size={20}  />
          </Link>
          <button className={styles.btnDelete}>
            <RiDeleteBin6Line size={20}  />
          </button>
        </div>
      ),
    },
  ];
  
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div>
      <h1 className={styles.titleBook}>Usuarios</h1>
      <div className={styles.container}>
        <div className={styles.btnContainer}>
          <Link to={"/adduser"} className={styles.btnAddUser}>
            <BsPlus size={20} />
            Agregar Usuario
          </Link>
        </div>
        <DataTable
          columns={columnas}
          data={users}
          paginationPerPage={5}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader
        />
      </div>
    </div>
  );
}

export default User;

import React, { useEffect, useState } from 'react'
import styles from "./reservation.module.css"
import DataTable from 'react-data-table-component'
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { getReservas } from '../../../util/api';
import { formatterDate } from '../../../util/formatterDate';
function Reservation() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const data = await getReservas();
      setReservations(data);
    };
    fetchReservations();
  },[]);
  const columnas = [
    {
      name: "Libro",
      selector: (row) => row.bookId.title,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.userId.name,
      sortable: true,
    },
    {
      name: "Codigo FET",
      selector: (row) => row.codigo,
      sortable: true,
    },
    {
      name: "Fecha de Salida",
      selector: (row) => formatterDate(row.horaYfecha),
      sortable: true,
    },
    {
      name: "Fecha de expriación",
      selector: (row) => formatterDate(row.fechaExpiracion),
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.status
    },
    {
      name: "Acciones",
      cell: () => (
        <div className={styles.btns}>
          <Link className={styles.btnEdit}>
            <BiEdit size={20}  />
          </Link>
          <button className={styles.btnDelete} >
            <RiDeleteBin6Line size={20}  />
          </button>
        </div>
      ),
    },
  ];
 
  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
  };
  return (
    <div>
      <h1 className={styles.titleBook}>Reservaciones</h1>
      <div className={styles.container}>
        <DataTable
          columns={columnas}
          data={reservations}
          paginationPerPage={5}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader
        />
      </div>
    </div>
  )
}

export default Reservation
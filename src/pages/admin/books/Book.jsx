import React, { useContext, useEffect, useState } from "react";
import styles from "./book.module.css";
import DataTable from "react-data-table-component";
import { BsPlus } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { deleteBook, getBooks } from "../../../util/api";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import ComponentModal from "../../../components/Modal/ComponentModal";

function Book() {
  const [books, setBooks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks();
      setBooks(data);

    };
    fetchBooks();
  },[]);

  const handleDelete = async (id) => {
    setOpenModal(true);
    setId(id);
    
  };

  const closeModal = () => {
    setOpenModal(false);
  }

  const onDeleted = async () => {
    setOpenModal(false);
    await deleteBook(user.token, id, toast);
    const data = await getBooks();
    setBooks(data);
  };
  const columns = [
    {
      name: "Título",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Autor",
      selector: (row) => row.author,
      sortable: true,
    },
    {
      name: "Editorial",
      selector: (row) => row.publisher,
      sortable: true,
    },
    {
      name: "Materia",
      selector: (row) => row.materia,
      sortable: true,
    },
    {
      name: "Lenguaje",
      selector: (row) => row.language,
      sortable: true,
    },
    {
      name: "Unidades",
      selector: (row) => row.unidad,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className={styles.btns}>
          <Link to={"/updatebook/"+row._id} className={styles.btnEdit} >
            <BiEdit  size={20}/>
          </Link>
          <button className={styles.btnDelete} onClick={() => handleDelete(row._id)}>
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
      <h1 className={styles.titleBook}>Libros</h1>
      <div className={styles.container}>
        <div className={styles.btnContainer}>
          <Link to={"/addbook"} className={styles.btnAddBook}>
            <BsPlus size={20} />
            Agregar Libro
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={books}
          paginationPerPage={5}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          fixedHeader
        />
      </div>
      <ComponentModal open={openModal} close={closeModal} onDelete={onDeleted}/>
    </div>
  );
}

export default Book;

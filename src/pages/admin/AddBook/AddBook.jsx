import React, { useContext } from "react";
import styles from "./add.module.css";
import { SlArrowLeft } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { createBook } from "../../../util/api";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";

function AddBook() {
  const { user } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      title: "",
      subtitulo: "",
      n_asignatura: "",
      codBook: "",
      author: "",
      materia: "",
      unidad: "",
      publisher: "",
      ISBN: "",
      ISSN: "",
      status: "",
      numberPages: "",
      language: "",
      description: "",
      fechaPublicacion: "",

    },
    onSubmit: async (values) => {
      await createBook(user.token, values, toast);
    }
  });
  return (
    // Formulario para agregar libros
    <div className={styles.addbookContainer}>
      <Link to={"/admin/books"} className={styles.btnBack}><SlArrowLeft size={10} className={styles.iconArrow} />Regresar</Link>
      <h1 className={styles.title}>Agregar Libro</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.formBook}>
          <div className={styles.divOne}>
            <input
              type="text"
              placeholder="Título"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            <input
              type="text"
              placeholder="Editorial"
              name="publisher"
              value={formik.values.publisher}
              onChange={formik.handleChange}
            />
            <input
              type="text"
              placeholder="Estado"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
            />
            <input
              type="text"
              placeholder="Asignatura"
              name="n_asignatura"
              value={formik.values.n_asignatura}
              onChange={formik.handleChange}
            />
            <input
              type="text"
              placeholder="Materia"
              name="materia"
              value={formik.values.materia}
              onChange={formik.handleChange}
            />
            <input
              type="text"
              placeholder="ISSN"
              name="ISSN"
              value={formik.values.ISSN}
              onChange={formik.handleChange}
            />
            <input
              type="text"
              placeholder="unidades"
              name="unidad"
              value={formik.values.unidad}
              onChange={formik.handleChange}
            />

          </div>
          <div className={styles.divTwo}>
            <input
              type="text"
              placeholder="lenguaje"
              name="language"
              value={formik.values.language}
              onChange={formik.handleChange}
            />
            <input
              type="text"
              placeholder="Subtitulo"
              name="subtitulo"
              value={formik.values.subtitulo}
              onChange={formik.handleChange}
            />
            <input
              type="text"
              placeholder="Autor"
              name="author"
              value={formik.values.author}
              onChange={formik.handleChange}
            />

            <input
              type="text"
              placeholder="Codigo"
              name="codBook"
              value={formik.values.codBook}
              onChange={formik.handleChange}
            />
            <input
              type="text"
              placeholder="ISBN"
              name="ISBN"
              value={formik.values.ISBN}
              onChange={formik.handleChange}
            />
            <input
              type="text"
              placeholder="numero de paginas"
              name="numberPages"
              value={formik.values.numberPages}
              onChange={formik.handleChange}
            />
            <input
              type="text"
              placeholder="descrpción"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <input
              type="text"
              placeholder="Fecha de publicación"
              name="fechaPublicacion"
              value={formik.values.fechaPublicacion}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className={styles.bottom}>
          <button type="submit" className={styles.btnAdd}>Agregar</button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;

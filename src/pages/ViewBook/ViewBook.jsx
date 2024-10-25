import React, { useContext, useEffect, useState } from "react";
import styles from "./viewbook.module.css";
import TopBar from "../../components/topbar/TopBar.jsx";
import { FaRegHeart } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import { createReservation, getBook } from "../../util/api.js";
import { toast } from "react-toastify";


function ViewBook() {
  const [book, setBook] = useState({}); 
  const { user } = useContext(AuthContext);
  const {id} = useParams();
  const navigate = useNavigate();

  const handleCreateReservation = async () => {
    if(!user){
      return navigate("/login");
    }

    

    const reservationData = {
      bookId: id,
      userId: user._id,
      tipoPrestamo: "Interno",
      fechaExpiracion: new Date().setDate(new Date().getDate() + 7),
    }
    // create reservation
    await createReservation(user.token, reservationData, toast);
    return navigate("/");
  }

  useEffect(() => {
    const fetchBook = async () => {
      const book = await getBook(id);
      setBook(book);
    };
    fetchBook();
  }, []);
  return (
    <div>
      <TopBar />
      <div className={styles.container}>
        <div className={styles.book}>
          <img
            className={styles.img}
            src={book.image ? book.image : "https://via.placeholder.com/250x400/4543t4j"}
          />
          <button type="text" className={styles.button} onClick={handleCreateReservation}>
            Reservar
          </button>
        </div>
        <div className={styles.detail}>
          <h1 className={styles.title}>Sinopsis</h1>
          <p className={styles.description}>
           {book.description}
          </p>

          <div className={styles.textDetail}>
            <h1 className={styles.title}>Autor:</h1>
            <p>{book.author}</p>
          </div>
          <div className={styles.textDetail}>
            <h1 className={styles.title}>Fecha de publicación:</h1>
            <p>{book.fechaPublicacion}</p>
          </div>
          <div className={styles.textDetail}>
            <h1 className={styles.title}>Materia:</h1>
            <p>{book.materia}n</p>
          </div>
          <div className={styles.textDetail}>
            <h1 className={styles.title}>Páginas:</h1>
            <p>{book.numberPages}</p>
          </div>
          <div className={styles.textDetail}>
            <h1 className={styles.title}>Editorial:</h1>
            <p>{book.publisher}</p>
          </div>

          <a className={styles.favorite}>
            Añadir a la lista
            <FaRegHeart size={25} className={styles.iconHeart} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ViewBook;

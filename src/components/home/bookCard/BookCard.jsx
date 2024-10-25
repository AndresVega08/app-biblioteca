import { Link } from "react-router-dom";
import styles from "./bookCard.module.css";
import { CiHeart } from "react-icons/ci";

const BookCard = ({ book }) => {
    return (
        <div className={styles.card}>
            <CiHeart size={30} color="white" className={styles.heartIcon} />
            <img
                src={book.image ? book.image : "https://via.placeholder.com/250x400/4543t4j"}
                alt=""
                className={styles.cover}
            />
            <div className={styles.content}>
                <h2 className={styles.title}>{book.title}</h2>
                <p className={styles.category}>materia: {book.materia}</p>
                <p className={styles.author}>autor: {book.author}</p>

            </div>
            <div className={styles.bottom}>
                <Link to={`/viewbook/${book._id}`} className={styles.btn}>Ver Más</Link>
            </div>

        </div>

    )
}

export default BookCard

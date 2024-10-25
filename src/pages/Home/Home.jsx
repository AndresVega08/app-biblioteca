import Banner from "../../components/home/banner/Banner"
import BookCard from "../../components/home/bookCard/BookCard"
import TopBar from "../../components/topbar/TopBar"
import styles from "./home.module.css"
import { useEffect, useState } from "react"
import { getBooks } from "../../util/api"


const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getBooks();
      setBooks(books);
    }
    fetchBooks();
  }, []);
  return (
    <div>
      <TopBar />
      <Banner />
      <div className={styles.text}>
        <h3>Todos los libros</h3>
      </div>
      <div className={styles.BookCardContainer}>
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  )
}

export default Home

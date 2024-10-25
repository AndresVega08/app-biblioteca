import styles from './right.module.css'
import logo from '../../../../assets/Logo-FET.png';


const Right = () => {
  return (
    <div className={styles.container}>
      <div className={styles.back}>
        <img src={logo} alt="logo-fet" className={styles.img} />
        <h1 className={styles.title}>Biblioteca</h1>
      </div>
    </div>
  )
}

export default Right

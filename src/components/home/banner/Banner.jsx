import styles from './banner.module.css';
import banner from '../../../assets/banner.png';

const Banner = () => {
    return (
        <div className={styles.container}>
            <div className={styles.bannerContainer}>
                <img src={banner} alt="banner" className={styles.bannerImg}/>
                <div className={styles.textContainer}>
                    <h1>Reserva tu libro</h1>
                    <span>Biblioteca universitaria</span>
                </div>
            </div>
        </div>
    )
}

export default Banner

import styles from './kpi.module.css'

const Kpi = ({stat, name, label, icon}) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <span>{name}</span>
        <div className={styles.icon}>
          {icon}
        </div>
      </div>
      <div className={styles.center}>
        <span>{stat}</span>
      </div>
      <div className={styles.bottom}>
        <span>{label}</span>
      </div>
    </div>
  )
}

export default Kpi

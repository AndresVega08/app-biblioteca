import { GrSchedule } from 'react-icons/gr'
import styles from './tablenews.module.css'
import { useEffect, useState } from 'react';
import { getReservas } from '../../../../util/api';
import { formatterDate } from '../../../../util/formatterDate';

const TableNews = () => {
    const [newReservations, setNewReservations] = useState([]);

    useEffect(()=>{
        const fetchReservations = async () => {
            const data = await getReservas(true);
            setNewReservations(data);
        };

        fetchReservations();
    },[]);

    
    
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <span>Reservaciones recientes</span>
                <GrSchedule size={25} />
            </div>
            <div className={styles.content}>
                <table>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>libro</th>
                            <th>Fecha incial</th>
                            <th>Fecha limite</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            newReservations.map((reservation)=>(
                                <tr key={reservation._id} className={`${reservation.status === "Entregado" ? styles.delivered : reservation.status === "Pendiente" ? styles.pending : styles.cancelled}`}>
                            <td >
                                <div className={styles.firstCell}>
                                    {reservation.userId.name}
                                </div>
                            </td>
                            <td>
                                <div>
                                    {reservation?.bookId.title}
                                </div>
                            </td>
                            <td>
                                <div>
                                    {formatterDate(reservation.horaYfecha)}
                                </div>
                            </td>
                            <td>
                                <div>
                                    {formatterDate(reservation.fechaExpiracion)}
                                </div>
                            </td>
                            <td>
                                <div className={styles.lastCell}>
                                    {reservation.status}
                                </div>
                            </td>
                        </tr>
                       
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableNews

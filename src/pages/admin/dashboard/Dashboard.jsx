import React, { useEffect, useState } from 'react'
import Kpi from '../../../components/admin/dashboard/Kpi/Kpi'
import styles from './dashboard.module.css'
import TableNews from '../../../components/admin/dashboard/TableNews/TableNews'
import { getBook, getBookMostReserv, getCountBooksRegister, getReservasCountMonth } from '../../../util/api'
import { FiBook } from 'react-icons/fi'
import { GiBookshelf } from "react-icons/gi";
import { HiOutlineSaveAs } from 'react-icons/hi'

const Dashboard = () => {
    const [libro, setLibro] = useState("");
    const [reservasStats, setReservasStats] = useState(0);
    const [totalLibro, setTotalLibro] = useState(0);

    useEffect(() => {
        const fetchReservasStats = async () => {
            try {
                const data = await getReservasCountMonth();
                const dataBooks = await getCountBooksRegister();
                const dataResevMonth = await getBookMostReserv();
                setReservasStats(data.cantidadReservas);
                setTotalLibro(dataBooks.cantidadLibros);
                setLibro(dataResevMonth);
            } catch (error) {
                console.log(error.response.data.message);
            }
        };
        fetchReservasStats();
    }, []);

    const stats = [
        {
            stat: reservasStats,
            name: "Reservas",
            label: "Reservas en el mes",
            icon: <HiOutlineSaveAs size={25} />
        },
        {
            stat: totalLibro,
            name: "Libros",
            label: "Libros registrados",
            icon: <GiBookshelf size={25} />
        },
        {
            stat: libro.libroMasReservado,
            name: "Libro",
            label: "Libro más reservado",
            icon: <FiBook size={25} />
        }
    ];
    return (
        <div>
            <h2 className={styles.title}>Estadisticas</h2>
            <div className={styles.top}>
                {stats.map((stat, index) => (
                    <Kpi key={index} stat={stat.stat} name={stat.name} label={stat.label} icon={stat.icon} />
                ))}
            </div>
            <h2 className={styles.title}>Novedades</h2>
            <TableNews />
        </div>
    )
}

export default Dashboard

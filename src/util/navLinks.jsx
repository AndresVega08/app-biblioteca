import { FaRegCalendar, FaRegCalendarCheck, FaRegUser } from "react-icons/fa";
import { FiBook } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";

export const navLinks = [
    {
        id: 1,
        title: 'Dashboard',
        path: '/admin/dashboard',
        icon: <RxDashboard size={20} />
    },
    {
        id: 2,
        title: 'libros',
        path: '/admin/books',
        icon: <FiBook size={20} />
    },
    {
        id: 3,
        title: 'Reservaciones',
        path: '/admin/reservations',
        icon: <FaRegCalendar size={20} />
    },
    {
        id: 4,
        title: 'Usuarios',
        path: '/admin/users',
        icon: <FaRegUser size={20} />
    },
    {
        id: 5,
        title: 'Reportes',
        path: '/admin/reports',
        icon: <FaRegCalendarCheck size={20}/>
    }
    
];
import { NavLink, Outlet } from 'react-router-dom'
import styles from "./adminLayout.module.css";
import logoSmall from "../../../assets/logo-small.png";
import { CiSearch } from "react-icons/ci";
import { navLinks } from "../../../util/navLinks";
import { RiShutDownLine } from 'react-icons/ri';
import { IoIosArrowBack } from 'react-icons/io';
import { useContext, useEffect } from 'react';
import { AsideContext } from '../../../context/AsideContext';
import { AuthContext } from '../../../context/AuthContext';

const AdminLayout = () => {
    const { isAsideOpen, toggleAside } = useContext(AsideContext);
    const {logout } = useContext(AuthContext);
    
 
    return (
        <div className={styles.container}>
            <div className={`${styles.aside} ${isAsideOpen ? styles.active : ""}`}>
                <button className={styles.btnToggle} onClick={toggleAside}>
                    <IoIosArrowBack />
                </button>
                <div className={styles.logo}>
                    <img src={logoSmall} alt="logo" />
                </div>
                <div className={styles.nav}>
                    <ul>
                        {navLinks.map(link => (
                            <li key={link.id}>
                                <NavLink to={link.path} className={({ isActive }) =>
                                    [
                                        isActive ? styles.active : "",
                                    ].join(" ")
                                }>
                                    {link.icon}
                                    {link.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.session} onClick={logout}>
                    <button> <RiShutDownLine size={20} /> Cerrar Sesión</button>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.containerSearch}>
                    <div className={styles.inputSearch}>
                        <input type="text" placeholder='Buscar...' />
                        <CiSearch size={20} color='gray' />
                    </div>
                </div>
                <div className={styles.containerContent}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout

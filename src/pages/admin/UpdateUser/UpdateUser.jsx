import React, { useContext, useEffect, useState } from "react";
import styles from "./updateuser.module.css";
import { SlArrowLeft } from "react-icons/sl";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { createUser, getUser, updateUser } from "../../../util/api";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";

const UpdateUser = () => {
    const { user: currentUser } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const { id } = useParams();

  
    

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            name: "",
            telefono: "",
            semestre: "",
            codigo: "",
            Programa: "",
            isAdmin: "",

        },
        onSubmit: async (values) => {
            await updateUser(currentUser.token, id, values, toast);
        },
    });

    useEffect(() => {
        const fetchUser = async () => {
          const userData = await getUser(id, currentUser.token);
          setUser(userData);
          formik.setValues(userData);
        };
        fetchUser();
      }, [id]);
    return (
        <div className={styles.container}>

            <Link to={"/admin/users"} className={styles.btnBack}>
                <SlArrowLeft size={10} className={styles.iconArrow} />
                Regresar
            </Link>
            <form onSubmit={formik.handleSubmit} className={styles.formUser}>
                <div className={styles.formControl}>

                    <div className={styles.divOne}>
                        <input
                            type="text"
                            placeholder="Nombre"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}

                        />
                        <input
                            type="text"
                            placeholder="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}

                        />
                        <input
                            type="text"
                            placeholder="contraseña"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}

                        />
                        <input
                            type="text"
                            placeholder="telefono"
                            name="telefono"
                            value={formik.values.telefono}
                            onChange={formik.handleChange}


                        />
                    </div>
                    <div className={styles.divTwo}>
                        <input
                            type="text"
                            placeholder="semestre"
                            name="semestre"
                            value={formik.values.semestre}
                            onChange={formik.handleChange}

                        />
                        <input
                            type="text"
                            placeholder="codigo"
                            name="codigo"
                            value={formik.values.codigo}
                            onChange={formik.handleChange}

                        />
                        <input
                            type="text"
                            placeholder="programa"
                            name="Programa"
                            value={formik.values.Programa}
                            onChange={formik.handleChange}


                        />
                        <select
                            name="isAdmin"
                            id="isAdmin"
                            value={formik.values.isAdmin}
                            onChange={formik.handleChange}

                        >
                            <option value="">Seleccione un rol</option>
                            <option value="true">Administrador</option>
                            <option value="false">Usuario</option>
                        </select>
                    </div>

                </div>
                <div className={styles.bottom}>
                    <button type="submit" className={styles.btnAdd}>Actualizar Usuario</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateUser

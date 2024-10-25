import styles from './left.module.css'
import { FaUserCircle } from "react-icons/fa";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SignIn } from '../../../../util/api';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Correo electronico invalido')
    .required('Campo requerido'),
  password: Yup.string()
    .required('Campo requerido')
});

const Left = () => {
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const history = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      SignIn(values, dispatch, history);
      
    }
  });

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <FaUserCircle size={150} className={styles.iconUser} />
        <h1 className={styles.title}>Iniciar sesión</h1>
        <input
          className={styles.input}
          type="email"
          placeholder="Correo electronico"
          id='email'
          name='email'
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Contraseña"
          id='password'
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <button className={styles.button} type='submit' disabled={isFetching}>
          {isFetching ?
            <Box sx={{ display: 'flex',  height:"100%", justifyContent: "center", alignItems: "center"}} size="15px" color="white">
              <CircularProgress />
            </Box>
            : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  )
}

export default Left

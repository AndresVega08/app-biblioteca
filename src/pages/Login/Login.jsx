import React from 'react';
import Right from '../../components/auth/login/Right/Right';
import Left from '../../components/auth/login/Left/Left';
import styles from './login.module.css';

const Login = () => {
  return (
    <div className={styles.container}>
      <Left />
      <Right />
    </div>
  )
}

export default Login

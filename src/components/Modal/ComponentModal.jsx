import Modal from 'react-modal';
import styles from "./modal.module.css";
import { AsideContext } from '../../context/AsideContext';
import { useContext } from 'react';

const customStyles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    right: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: '300px',
    zIndex: '9999999999',
  },
};

const ComponentModal = ({ open, close, onDelete }) => {
  let subtitle;




  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  const { isAsideOpen } = useContext(AsideContext);

  return (
    <div>
      <Modal
        isOpen={open}
        onAfterOpen={afterOpenModal}
        onRequestClose={close}
        contentLabel="Example Modal"
        className={isAsideOpen ? styles.modal : styles.modalAside}
        overlayClassName={styles.overlay}
        
      >
        <div className={styles.modalContent}>
          <h2>Eliminar Libro</h2>
          <p>¿Estás seguro de que deseas eliminar este libro?</p>
          <div className={styles.buttonContainer}>
            <button className={styles.deleteButton} onClick={onDelete}>Eliminar</button>
            <button className={styles.cancelButton} onClick={close}>Cancelar</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ComponentModal

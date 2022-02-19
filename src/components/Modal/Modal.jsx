import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ handleClose, children }) => {
  useEffect(() => {
    document.addEventListener('keydown', close);

    return () => document.removeEventListener('keydown', close);
  }, [])

  const close = event => {
    if (event.code === 'Escape') {
      handleClose();
    }
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={close}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

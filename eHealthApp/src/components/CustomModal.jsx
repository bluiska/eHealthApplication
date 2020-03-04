import React from 'react';
import propTypes from 'prop-types';
import Modal from 'react-modal';

const styles = {
  modal: {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    },
    overlay: {
      backgroundColor: 'rgba(0.3,0.3,0.3,0.5)'
    }
  }
};

const CustomModal = props => {
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      ariaHideApp={false}
      style={{ ...styles.modal, ...props.style }}
    >
      {props.children}
    </Modal>
  );
};

CustomModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  style: propTypes.object
};

export default CustomModal;

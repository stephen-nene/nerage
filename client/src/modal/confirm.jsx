// Modal.js

import React from 'react';
import '../assets/css/ConfirmImg.css';

const ConfirmImg = ({ isOpen, closeModal,image }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Is this your Sites image ?</h2>
        <img src={image} alt="Modal Image" className="modal-image" />

        <div className="modal-buttons">
          <button className="yes-button" >
            Yes
          </button>
          <button className="no-button" >
            No
          </button>
        </div>

        <button className="close-button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ConfirmImg;

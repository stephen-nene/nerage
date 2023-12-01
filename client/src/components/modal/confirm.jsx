// Modal.js

import React from 'react';
import '../../assets/styles/ConfirmImg.css';
import { message } from 'antd';

const ConfirmImg = ({ isOpen, closeModal,image }) => {
  if (!isOpen) {
    return null;
  }

  function HandleNo() {
    message.error('informed admins about the error')
    setTimeout(() => {
     closeModal()
    },4000)
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <img src={image} alt="Modal Image" className="modal-image" />
        {/* <p>image for{image}</p> */}
        <h2 className='text-2xl mb-3 '>Is this your Sites image ?</h2>

        <div className="modal-buttons">
          <button onClick={closeModal} className="hover:bg-green-600 hover:text-white yes-button" >
            Yes
          </button>
          <button  className="hover:bg-red-600 hover:text-white no-button"  onClick={HandleNo}  >
            No
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmImg;

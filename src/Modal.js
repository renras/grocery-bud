import React, { useEffect } from "react";

const Modal = ({ modalContent, closeModal, modal }) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 3000);
  });
  return (
    <>
      <p ref={modal} className="modalContent">
        {modalContent}
      </p>
    </>
  );
};

export default Modal;

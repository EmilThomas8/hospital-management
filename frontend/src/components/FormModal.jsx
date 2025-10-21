// frontend/src/components/FormModal.jsx

import React from "react";

const FormModal = ({ title, onClose, onSubmit, children }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h3>{title}</h3>
          <button onClick={onClose}>×</button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button onClick={onClose}>Cancel</button>
          <button className="primary" onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;

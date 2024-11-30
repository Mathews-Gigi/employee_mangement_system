import React from "react";

function Modal({ children, isOpen, onClose, title, showCloseButton = true }) {
  if (!isOpen) return null; // Render nothing if modal is not open

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-labelledby="modal-title"
      aria-hidden={!isOpen}
    >
      <div className="relative bg-white w-[90%] max-w-lg p-6 rounded-lg shadow-lg">
        {/* Modal Header */}
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h2
              id="modal-title"
              className="text-xl font-semibold text-gray-800"
            >
              {title}
            </h2>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-red-500 hover:text-gray-700 focus:outline-none"
                aria-label="Close Modal"
              >
                &times;
              </button>
            )}
          </div>
        )}

        {/* Modal Content */}
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
}

export default Modal;

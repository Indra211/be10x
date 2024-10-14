import React, { ReactNode } from "react";

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ showModal, closeModal, children }) => {
  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex flex-col items-center justify-center"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={closeModal}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

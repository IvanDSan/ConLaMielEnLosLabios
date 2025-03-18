import { useEffect } from 'react';
import './styles.css';

export const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Evitar scroll
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className='modal-extra-layer' onClick={(e) => e.stopPropagation()}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            <img src="/icons/close.svg" alt="close" />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

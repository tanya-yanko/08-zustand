import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode; 
}

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return ReactDOM.createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.close} onClick={onClose} aria-label="Close modal">
          ×
        </button>

        {children} {}
      </div>
    </div>,
    document.body
  );
}

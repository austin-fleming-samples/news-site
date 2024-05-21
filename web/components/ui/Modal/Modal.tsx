import { ReactNode, useEffect } from 'react';
import { cloin } from '@lib/cloin';
import { PolyButton } from '..';
import S from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
  className?: string;
  id: string;
  isOpen: boolean;
  labeledById: string;
  setIsOpen: (state: boolean) => void;
}
/* 
Features "click outside" close functionality.
*/
export const Modal = ({ id, children, className, isOpen, setIsOpen, labeledById }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';

    const handleKeypress = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeypress);

    return () => {
      document.removeEventListener('keydown', handleKeypress);
    };
  }, [setIsOpen, isOpen]);

  const handleClose = () => setIsOpen(false);

  const rootClasses = cloin(S.root, !!isOpen && S.isOpen);
  const modalClasses = cloin(S.modal, className);

  return (
    <div className={rootClasses}>
      {/* ESNOTE: screenreaders can use 'close' button. Action on wrapper is purely for convenience. */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div className={S.backdrop} onClick={handleClose} />
      <div
        aria-modal
        aria-hidden={!isOpen}
        aria-labelledby={labeledById}
        className={modalClasses}
        id={id}
        role='dialog'>
        <PolyButton
          as='button'
          className={S.closeButton}
          size='sm'
          type='button'
          onClick={handleClose}>
          close
        </PolyButton>
        {children}
      </div>
    </div>
  );
};

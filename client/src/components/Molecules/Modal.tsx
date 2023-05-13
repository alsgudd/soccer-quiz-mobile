import { ReactNode } from "react";
import styled from "styled-components";


interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <ModalOverlay isOpen={isOpen}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        { children }
      </ModalContent>
    </ModalOverlay>
  )
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 350px;
  height: 300px;
  transform: translate(-50%, -50%);
  background-color: white;
  // padding: 30px;
  border-radius: 40px;
`


export default Modal;










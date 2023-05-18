import { ReactNode } from "react";
import styled from "styled-components";


interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: ReactNode;
  height?: string;
}

const Modal = ({ isOpen, onClose, children, height }: ModalProps) => {
  return (
    <ModalOverlay isOpen={isOpen}>
      <ModalContent 
        onClick={(e) => e.stopPropagation()}
        height={height}
      >
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

const ModalContent = styled.div<{ height: string | undefined }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 350px;
  height: ${({ height }) => height || "300px"};
  transform: translate(-50%, -50%);
  background-color: white;
  // padding: 30px;
  border-radius: 40px;
`


export default Modal;










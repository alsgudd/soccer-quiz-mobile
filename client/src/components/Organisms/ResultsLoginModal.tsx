import { Modal } from "components/Molecules";
import Atoms from "components/Atoms";

interface ResultsModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}


const ResultsLoginModal = ({ isOpen, onClose, onConfirm }: ResultsModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Atoms.Div
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Atoms.Title margin="0px 0px 16px 0px">
          GO TO LOGIN
        </Atoms.Title>
        <Atoms.SubTitle margin="0px 0px 16px 0px">
          This Service Requires a login
        </Atoms.SubTitle>
        <br />
        <Atoms.Button
          designType="primary400"
          height="48px"
          width="calc(50% - 4px)"
          borderRadius="8px"
          fontSize="20px"
          onClick={onConfirm}
        >
          GO TO LOGIN
        </Atoms.Button>
        <Atoms.Button
          designType="border"
          height="48px"
          width="calc(50% - 4px)"
          borderRadius="8px"
          fontSize="20px"
          marginTop="7px"
          onClick={onClose}
        >
          CLOSE
        </Atoms.Button>
      </Atoms.Div>
    </Modal>
  )
}

export default ResultsLoginModal;
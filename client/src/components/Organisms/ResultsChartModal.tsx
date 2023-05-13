import { Modal, AnimationLoader } from "components/Molecules";
import Atoms from "components/Atoms";

interface ResultsChartModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

const ResultsChartModal = ({ isOpen, onClose, onConfirm } :ResultsChartModalProps) => {
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
          REGISTER RECORDS SUCCESS!
        </Atoms.Title>
        <AnimationLoader
          name="checked"
          path="https://assets3.lottiefiles.com/packages/lf20_niyfyoqs.json"
          size="120px"
        />
        <Atoms.Button
          designType="primary400"
          height="32px"
          width="calc(50% - 4px)"
          borderRadius="8px"
          fontSize="20px"
          onClick={onConfirm}
        >
          GO TO CHART
        </Atoms.Button>
        <Atoms.Button
          designType="border"
          height="32px"
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

export default ResultsChartModal;
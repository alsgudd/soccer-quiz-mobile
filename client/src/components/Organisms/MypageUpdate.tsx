import { Content } from "components/Molecules"
import Atoms from "components/Atoms"
import { useState } from "react";
import { MypageUpdateModal } from "components/Organisms";


const MypageUpdate = () => {

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const handleClickToUpdate = () => {
    setIsUpdateModalOpen(true);
  }
  const handleUpdateModalClose = () => {
    setIsUpdateModalOpen(false);
  }
  const handleUpdateModalConfirm = () => {
    setIsUpdateModalOpen(false)
  }

  return (
    <Content 
      header="Modifying membership information"
      height="124px"
    >
      <Atoms.Button
        margin="10px 0px 0px 0px"
        designType="primary200"
        height="48px"
        width="calc(70% - 10px)"
        borderRadius="20px"
        fontSize="20px"
        onClick={handleClickToUpdate}
      >
        MODIFY PASSWORD
      </Atoms.Button>
      <MypageUpdateModal 
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        onConfirm={handleUpdateModalConfirm}
      />
    </Content>
  )
}

export default MypageUpdate
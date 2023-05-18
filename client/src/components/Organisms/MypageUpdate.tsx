import { Content } from "components/Molecules"
import Atoms from "components/Atoms"

const MypageUpdate = () => {
  const handleClickToUpdate = () => {

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
    </Content>
  )
}

export default MypageUpdate
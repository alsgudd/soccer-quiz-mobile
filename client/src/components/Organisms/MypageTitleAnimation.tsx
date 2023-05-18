import axios from "axios";
import { useEffect } from "react"
import { isIosNotch } from "src/utils";

import { Content, AnimationLoader } from "components/Molecules";
import Atoms from "components/Atoms";

import { useNavigate } from "react-router";
import { FaHome } from "react-icons/fa";

const MypageTitleAnimation = () => {
  const navigate = useNavigate();
  const FaHomeIcon: JSX.Element =
    <FaHome style={{ cursor: "pointer" }}
      onClick={() => navigate("/")} />;

  useEffect(() => {
    axios({
      
    })
  }, [])
  return (
    <Content
      marginTop="0px"
      height={`calc(100% - 124px - 124px - ${isIosNotch() ? '96px' : '80px'})`}
      header={FaHomeIcon}
    >
      <Atoms.Div
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Atoms.Title margin="0px 0px 16px 0px">MY PAGE</Atoms.Title>
        <AnimationLoader
          name="Dinosaur"
          path="https://assets4.lottiefiles.com/packages/lf20_IJpMIV0zMj.json"
          size="220px"
        />
      </Atoms.Div>
    </Content>
  )
}

export default MypageTitleAnimation;
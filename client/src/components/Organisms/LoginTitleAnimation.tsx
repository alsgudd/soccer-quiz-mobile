import { useNavigate } from "react-router";
import { FaHome } from "react-icons/fa";
import { Content, AnimationLoader } from "components/Molecules";
import { isIosNotch } from "src/utils";
import Atoms from "components/Atoms";


const LoginTitleAnimation = () => {
  const navigate = useNavigate();
  const FaHomeIcon: JSX.Element = 
    <FaHome style={{ cursor: "pointer" }} 
      onClick={() => navigate("/")} />;

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
        <Atoms.Title margin="0px 0px 16px 0px">
          LOGIN
        </Atoms.Title>
        <AnimationLoader
          name="signin"
          path="https://assets6.lottiefiles.com/packages/lf20_dn6rwtwl.json"
          size="220px"
        />
      </Atoms.Div>
    </Content>
  )

};

export default LoginTitleAnimation;

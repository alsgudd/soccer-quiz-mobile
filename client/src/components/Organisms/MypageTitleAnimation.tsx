import axios from "axios";
import { useEffect } from "react"
import { isIosNotch } from "src/utils";

import { Content, AnimationLoader } from "components/Molecules";
import Atoms from "components/Atoms";

import { useNavigate } from "react-router";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { IsLoggedInState } from "src/recoil";



const MypageTitleAnimation = () => {
  const navigate = useNavigate();
  const serverURL = process.env.REACT_APP_SERVER_URL;


  const handleClickToSignOut = () => {
    const result = window.confirm("Are you sure you want to log out?");
    if(result) {
      axios({
        url: `${serverURL}/auth/logout`,
        method: "GET",
        withCredentials: true,
      }).then((response) => {
        window.alert("Logout Success! See you again😊");
        navigate('/');
      }).catch((e) => {
        window.alert("An unknown error has occurred. Please try again");
      })
    } 
  }
  const FaHomeIcon: JSX.Element =
    <FaHome style={{ cursor: "pointer" }}
      onClick={() => navigate("/")} />;

  const FaSignOut: JSX.Element = 
    <FaSignOutAlt style={{ cursor: "pointer" }} 
      onClick={handleClickToSignOut}/>


  

  useEffect(() => {
    // user not login!
    // if(!isLoggedIn) {
    //   window.alert("This page is only available to members. Go to the homepage.");
    //   navigate('/');
    // }
  }, [])
  return (
    <Content
      marginTop="0px"
      height={`calc(100% - 124px - 124px - ${isIosNotch() ? '96px' : '80px'})`}
      header={FaHomeIcon}
      headerRight={FaSignOut}
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
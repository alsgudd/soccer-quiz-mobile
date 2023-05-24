import { useEffect } from "react"
import { isIosNotch } from 'src/utils';
import { AnimationLoader, Content } from 'components/Molecules';
import { FaSignInAlt, FaRegChartBar, FaUser } from 'react-icons/fa'
import Atoms from 'components/Atoms';
import { useNavigate } from 'react-router-dom';
import { useRefreshValidToken } from 'src/hooks';
import { useRecoilValue } from "recoil";
import { IsLoggedInState } from "src/recoil";


const LandingTitleAnimation = () => {
  const isLoggedIn = useRecoilValue(IsLoggedInState);
  const { status } = useRefreshValidToken();

  const navigate = useNavigate();
  const handleClickToSignIn = () => {
    navigate('/login');
  }
  const handleClickToShowChart = () => {
    navigate('/chart');
  }
  const handleClickToMyPage = () => {
    navigate('/mypage');
  }

  const FaSignIn: JSX.Element =
    <FaSignInAlt style={{ cursor: "pointer" }}
      onClick={handleClickToSignIn} />
  const FaChart: JSX.Element =
    <FaRegChartBar style={{ cursor: "pointer" }}
      onClick={handleClickToShowChart} />
  const FaUserIcon: JSX.Element =
    <FaUser style={{ cursor: "pointer" }}
      onClick={handleClickToMyPage} />

  useEffect(() => {
    if(status === 403) {
      window.alert('Your session has expired. Go to the login page.');
      navigate('/login')
    }
    console.log(isLoggedIn);
  }, [isLoggedIn, status])

  return (
    <Content
      marginTop="0px"
      height={`calc(100% - 124px - 124px - ${isIosNotch() ? '96px' : '80px'})`}
      header={FaChart}
      headerRight={isLoggedIn ? FaUserIcon : FaSignIn}
    >
      <Atoms.Div
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Atoms.Title margin="0px 0px 16px 0px">
          SOCCER QUIZ
        </Atoms.Title>
        <AnimationLoader
          name="trophy"
          path="https://assets1.lottiefiles.com/packages/lf20_rmlyntkm.json"
          size="220px"
        />
      </Atoms.Div>
    </Content>
  );
};

export default LandingTitleAnimation;

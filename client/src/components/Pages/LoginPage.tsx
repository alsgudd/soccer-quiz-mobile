import { FaHome } from 'react-icons/fa';
import Atoms from 'components/Atoms'
import { Content } from 'components/Molecules';
import { isIosNotch } from 'src/utils';
import { useNavigate } from 'react-router';
import { LoginForm } from 'components/Organisms';

const LoginPage = () => {
  const navigate = useNavigate();

  const FaHomeIcon: JSX.Element = 
    <FaHome style={{ cursor: "pointer" }} 
      onClick={() => navigate('/')}/>

  return (
    <Content 
      marginTop="0px"
      // height={`calc(100% - 124px - 124px - ${isIosNotch() ? '96px' : '80px'})`}
      // height={`calc(100% - 124px - 124px - 124px)`}
      height="100%"
      header={FaHomeIcon}
      overflow="hidden"
    >
      <Atoms.Div
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        height="100%"      
      >
        <Atoms.Title margin="16px 0px 16px 0px">
          SOCCER QUIZ LOGIN
        </Atoms.Title>
        <LoginForm />
      </Atoms.Div>
    </Content>
  )
}

export default LoginPage;
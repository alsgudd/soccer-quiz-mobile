import Atoms from "components/Atoms";
import { getQueryData } from 'src/utils';
import { Exclamation } from 'src/components/icons';
import { useNavigate } from "react-router";

const Page404 = () => {
  const { platform } = getQueryData();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/');
    window.location.reload();
  }
  return (
    <Atoms.Div
      display="flex"
      alignItems="center"
      justifyContent="center"
      padding={`var(--padding-${platform})`}
      height="100vh"
      background="var(--white)"
    >
      <Atoms.Div
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        <Exclamation size="big" />
        <Atoms.Div marginTop="16px" fontWeight="bold" fontSize="20px">
          404 NOT FOUND
        </Atoms.Div>
        <Atoms.Div
          marginTop="12px"
          textAlign="center"
          color="var(--grey-400)"
        >
          <Atoms.Div>
            The page you requested could not be found
            <br />
            because the address was entered incorrectly, changed or deleted.
          </Atoms.Div>
          <br />
          <Atoms.Button
            designType="primary200"
            height="56px"
            width="100%"
            borderRadius="8px"
            fontSize="20px"
            onClick={handleClick}
          >GO TO HOME</Atoms.Button>
        </Atoms.Div>
      </Atoms.Div>
    </Atoms.Div>
  )
}

export default Page404;
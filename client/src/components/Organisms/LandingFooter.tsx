import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';

import { InitialPropsState } from 'src/recoil';
import { FixedFooter } from 'components/Molecules';
import Atoms from 'components/Atoms';

const LandingFooter = () => {
  const navigate = useNavigate();
  const resetIntialProps = useResetRecoilState(InitialPropsState);

  const handleClick = () => {
    resetIntialProps();
    navigate('/quiz');
  };

  return (
    <FixedFooter>
      <Atoms.Button
        designType="primary400"
        height="56px"
        width="100%"
        borderRadius="8px"
        fontSize="20px"
        onClick={handleClick}
      >
        START
      </Atoms.Button>
    </FixedFooter>
  );
};

export default LandingFooter;

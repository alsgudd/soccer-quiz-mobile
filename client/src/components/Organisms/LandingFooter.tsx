import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import { InitialPropsState, QuizNumbersState, QuizTeamState } from 'src/recoil';
import { FixedFooter } from 'components/Molecules';
import Atoms from 'components/Atoms';

const LandingFooter = () => {
  const navigate = useNavigate();
  const resetIntialProps = useResetRecoilState(InitialPropsState);
  const quizNumbers = useRecoilValue(QuizNumbersState);
  const quizTeam = useRecoilValue(QuizTeamState)

  const handleClick = () => {
    if(Number(quizNumbers) < 1 || Number(quizNumbers) > 10) {
      window.alert('Quiz numbers must be between 1 and 10.😁');
      return;
    }
    if(quizTeam === undefined) {
      window.alert('Please select the team you want to take the quiz.😁');
      return;
    }
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

import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { TResponseData } from 'src/recoil/InitialProps';
import {
  CurrentQuizIndexState,
  InitialPropsState,
  SelectedAnswerState,
} from 'src/recoil';
import { FixedFooter } from 'components/Molecules';
import Atoms from 'components/Atoms';
import { RightArrow } from 'components/icons';

const QuizFooter = () => {
  const navigate = useNavigate();
  const [currentQuizIndex, setCurrentQuizIndex] = useRecoilState(
    CurrentQuizIndexState,
  );
  const initialProps = useRecoilValue(InitialPropsState);
  const [selectedAnswer, setSelectedAnswer] = useRecoilState(
    SelectedAnswerState,
  );
  const isLastQuiz =
    currentQuizIndex === (initialProps as TResponseData).results.length - 1;
  const isSolved = selectedAnswer !== undefined;

  const handleClick = () => {
    if (isLastQuiz) {
      navigate('/result');
    } else {
      if (isSolved) {
        setCurrentQuizIndex((prev) => prev + 1);
        setSelectedAnswer(undefined);
      }
    }
  };

  return (
    <FixedFooter>
      <Atoms.Button
        designType={isSolved ? 'primary400' : 'disabled'}
        height="56px"
        width="100%"
        borderRadius="8px"
        fontSize="20px"
        disabled={!isSolved}
        onClick={handleClick}
      >
        {isLastQuiz ? (
          'RESULTS'
        ) : (
          <>
            NEXT <RightArrow color="var(--white)" />
          </>
        )}
      </Atoms.Button>
    </FixedFooter>
  );
};

export default QuizFooter;

import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';

import { QuizNumbersState } from 'src/recoil';
import { Content } from 'components/Molecules';
import Atoms from 'components/Atoms';

const LandingQuizNumbers = () => {
  const [quizNumbers, setQuizNumbers] = useRecoilState(QuizNumbersState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuizNumbers(Number(e.target.value));
  };

  return (
    <Content header="Number of QUIZs(1 ~ 10)">
      <Atoms.Input
        type="number"
        placeholder="eg. 10"
        min='1'
        max='10'
        margin="16px 0px"
        value={quizNumbers}
        onChange={handleChange}
      />
    </Content>
  );
};

export default LandingQuizNumbers;

import { useState } from "react";

import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  CurrentQuizIndexState,
  IsLoggedInState,
  QuizResultsState,
  SelectedAnswerState,
} from 'src/recoil';
import { FixedFooter } from 'components/Molecules';
import Atoms from 'components/Atoms';

const ResultsFooter = () => {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(IsLoggedInState);
  const setCurrentQuizIndex = useSetRecoilState(CurrentQuizIndexState);
  const setSelectedAnswer = useSetRecoilState(SelectedAnswerState);
  const setQuizResults = useSetRecoilState(QuizResultsState);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const resetQuizIndexAndAnswer = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(undefined);
    setQuizResults([]);
  };

  const handleClick = () => {
    resetQuizIndexAndAnswer();
    navigate('/');
  };

  const handleClickToRetry = () => {
    resetQuizIndexAndAnswer();
    navigate('/quiz');
  };
  const handleClickToChart = () => {
    if(isLoggedIn) {
      navigate('/chart');
    } else {
      setIsModalOpen(true);
    }
  }
  const handleLoginModalClose = () => {
    setIsModalOpen(false);
  }
  const handleLoginModalConfirm = () => {
    setIsModalOpen(false);
    navigate('/login');
  }

  return (
    <FixedFooter>
      <Atoms.Button
        designType="primary400"
        height="56px"
        width="calc(40% - 4px)"
        borderRadius="8px"
        fontSize="20px"
        onClick={handleClick}
      >
        START PAGE
      </Atoms.Button>
      <Atoms.Button
        designType="border"
        marginLeft="8px"
        height="56px"
        width="calc(60% - 4px)"
        borderRadius="8px"
        fontSize="20px"
        onClick={handleClickToRetry}
      >
        REGISTER RECORDS
      </Atoms.Button>
    </FixedFooter>
  );
};

export default ResultsFooter;

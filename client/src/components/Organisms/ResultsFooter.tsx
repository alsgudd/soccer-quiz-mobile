import { useState } from "react";

import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';

import {
  CurrentQuizIndexState,
  IsLoggedInState,
  QuizResultsState,
  SelectedAnswerState,
} from 'src/recoil';
import { FixedFooter } from 'components/Molecules';
import { ResultsLoginModal, ResultsChartModal } from 'components/Organisms';
import Atoms from 'components/Atoms';

import { saveInCollction } from "src/utils";
import { useSaveRecord } from "src/hooks";


const ResultsFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();


  const isLoggedIn = useRecoilValue(IsLoggedInState);
  const setCurrentQuizIndex = useSetRecoilState(CurrentQuizIndexState);
  const setSelectedAnswer = useSetRecoilState(SelectedAnswerState);
  const [quizResults, setQuizResults] = useRecoilState(QuizResultsState);

  const duration = Math.floor(quizResults
    .map((quiz) => quiz.duration)
    .reduce((acc, cur) => acc + cur, 0) / 100,
  ) / 10
  const correctQuizNumbers = quizResults.filter((quiz) => quiz.correct).length;


  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);

  const resetQuizIndexAndAnswer = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(undefined);
    setQuizResults([]);
  };

  const handleClick = () => {
    resetQuizIndexAndAnswer();
    navigate('/');
  };

  const handleClickToChart = async () => {
    // resetQuizIndexAndAnswer();
    if (isLoggedIn) {
      console.log(1);
      // Save Record in DB.

      saveInCollction(correctQuizNumbers, duration)
      console.log(2);
      setIsChartModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  }
  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  }
  const handleLoginModalConfirm = () => {
    setIsLoginModalOpen(false);
    navigate('/login', { state: pathname });
  }

  const handleChartModalClose = () => {
    setIsChartModalOpen(false);
  }
  const handleChartModalConfirm = () => {
    setIsChartModalOpen(false);
    navigate('/chart');
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
        onClick={handleClickToChart}
      >
        REGISTER RECORDS
      </Atoms.Button>
      <ResultsLoginModal
        isOpen={isLoginModalOpen}
        onClose={handleLoginModalClose}
        onConfirm={handleLoginModalConfirm}
      />
      <ResultsChartModal
        isOpen={isChartModalOpen}
        onClose={handleChartModalClose}
        onConfirm={handleChartModalConfirm}
      />
    </FixedFooter>
  );
};

export default ResultsFooter;

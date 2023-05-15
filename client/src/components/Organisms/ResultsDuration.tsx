import { useRecoilValue } from "recoil";

import { QuizResultsState } from 'src/recoil';
import { Content } from "components/Molecules";

const ResultsDuration = () => {
  const quizResults = useRecoilValue(QuizResultsState);

  return (
    <Content 
      header={`Duration : ${
        Math.floor(
          quizResults
            .map((quiz) => quiz.duration)
            .reduce((acc, cur) => acc + cur, 0) / 100,
        ) / 10
      }s`}
    
    />
  )
}

export default ResultsDuration;
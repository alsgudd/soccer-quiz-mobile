import {
  ResultsTrophyNumbers,
  ResultsDuration,
  ResultsScoreChart,
  ResultsFooter,
} from 'components/Organisms';

const ResultsPage = () => {
  return (
    <>
      <ResultsTrophyNumbers />
      <ResultsDuration />
      <ResultsScoreChart />
      <ResultsFooter />
    </>
  );
};

export default ResultsPage;

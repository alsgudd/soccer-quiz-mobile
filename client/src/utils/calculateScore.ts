const calculateScore = (correctCount: number, timeInSeconds: number) => {
  const scoreWeight = 1;
  const timeWeight = 0.4;

  const score = (correctCount * scoreWeight + (1 / timeInSeconds) * timeWeight) * 100;
  const roundedScore = score.toFixed(2);

  return parseFloat(roundedScore);
}

export default calculateScore;
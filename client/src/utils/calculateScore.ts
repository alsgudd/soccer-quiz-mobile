
const calculateScore = (correctCount: number, timeInSeconds: number) => {
  const scoreWeight = 1;
  const timeWeight = 0.4;

  const score = correctCount * scoreWeight + (1 / timeInSeconds) * timeWeight;

  return score * 100;
}

export default calculateScore;
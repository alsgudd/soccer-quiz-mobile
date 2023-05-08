const addCorrectAnswerRandomly = (incorrectAnswers: string[], correctAnswer: string) => {
  const examples = [...incorrectAnswers];
  examples.splice(
    Math.floor(Math.random() * incorrectAnswers.length + 1),
    0,
    correctAnswer,
  );
  return examples;
};

export default addCorrectAnswerRandomly;




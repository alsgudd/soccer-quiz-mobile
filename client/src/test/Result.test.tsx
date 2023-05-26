/* eslint-disable */

import { RecoilRoot } from 'recoil';
import { cleanup, render, screen } from '@testing-library/react';

import { QuizResultsState } from 'src/recoil';
import { ResultsDuration, ResultsScoreChart } from 'src/components/Organisms';

const quizResults = [
  { index: 0, duration: 1897, correct: true },
  { index: 0, duration: 4732, correct: true },
  { index: 1, duration: 2234, correct: false },
];

beforeEach(() => {
  render(
    <RecoilRoot
      initializeState={({ set }) => {
        set(QuizResultsState, quizResults);
      }}
    >
      <ResultsDuration />
      <ResultsScoreChart />
    </RecoilRoot>,
  );
});
afterEach(cleanup);

describe('Result Page', () => {
  test('render duration', () => {
    const duration = screen.getByText(
      Math.floor(
        quizResults
          .map((quiz) => quiz.duration)
          .reduce((acc, cur) => acc + cur, 0) / 100,
      ) / 10,
      { exact: false },
    );

    expect(duration).toBeInTheDocument();
  });
  test('render numbers of correct answers and incorrect answers', () => {
    const correnctAnswerElement = screen.getByText(
      quizResults.filter((quiz) => quiz.correct).length,
      { exact: false },
    );

    expect(correnctAnswerElement).toBeInTheDocument();

    const incorrenctAnswerElement = screen.getByText(
      quizResults.filter((quiz) => !quiz.correct).length,
      { exact: false },
    );

    expect(incorrenctAnswerElement).toBeInTheDocument();
  });
})
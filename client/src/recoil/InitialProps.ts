import { selector } from 'recoil';
import axios from 'axios';

import { decodeHtml } from 'src/utils';
import {
  QueryDataState,
  QuizNumbersState,
  QuizTeamState
} from 'src/recoil';
import { DEFAULT_NUMBERS, QUIZ_PAGENAME } from 'src/constant';

export type TQuiz = {
  question: string;
  correct_answer: string;
  incorrect_answer: string[];
  examples: string[];
};

export type TResponseData = {
  results: TQuiz[];
};

export default selector<TResponseData>({
  key: 'initialOrderState',
  get: async ({ get }) => {
    // queryData가 수정될때마다 아래 코드를 실행
    const queryData = get(QueryDataState);
    if (
      queryData === undefined ||
      window.location.pathname !== `/${QUIZ_PAGENAME}`
    )
      return undefined;

    const { amount, team } = queryData;
    const response = await axios({
      url: `${process.env.REACT_APP_SERVER_URL}/quiz/get`,
      method: "GET",
      params: {
        amount: amount,
        team: team,
      }
    })
    const decodedResponseData = {
      ...response.data,
      results: response.data.results.map((quiz: TQuiz) => {
        console.log(quiz);
        const decoded_correct_answer = decodeHtml(quiz.correct_answer);
        const decoded_incorrect_answers = quiz.incorrect_answer.map((answer) =>
          decodeHtml(answer),
        );
        const decoded_examples = quiz.examples.map((example) => 
          decodeHtml(example),
        )
        return {
          ...quiz,
          question: decodeHtml(quiz.question),
          correct_answer: decoded_correct_answer,
          incorrect_answers: decoded_incorrect_answers,
          examples: decoded_examples
        };
      }),
    }
    return decodedResponseData;
  },
  set: ({ get, set }) => {
    const amount = get(QuizNumbersState);
    const team = get(QuizTeamState);

    set(QueryDataState, { amount, team });
    set(QuizNumbersState, DEFAULT_NUMBERS);
    set(QuizTeamState, undefined);
  },
});

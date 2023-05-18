import axios from "axios";
import { calculateScore } from "src/utils";



const saveInCollction = (
  correctQuizNumbers: number,
  duration: number,
  quizTeam: string | undefined,
): any => {
  const score = calculateScore(correctQuizNumbers, duration);
  const body = {
    quizTeam: quizTeam,
    score: score
  }

  axios({
    url: `${process.env.REACT_APP_SERVER_URL}/quiz/save`,
    method: "POST",
    withCredentials: true,
    data: body
  })
    .then((response) => {
      console.log(response);
    })
    .catch((e) => {
      console.log(e);
    })

}

export default saveInCollction;
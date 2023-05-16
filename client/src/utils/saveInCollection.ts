import axios from "axios";



const saveInCollction = (
  correctQuizNumbers: number,
  duration: number
) => {
  const body = {
    correctQuizNumbers: correctQuizNumbers,
    duration: duration
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
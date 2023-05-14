import axios from "axios";



const saveInCollction = async (
  correctQuizNumbers: number, 
  duration: number
): Promise<number> => {
  const body = {
    correctQuizNumbers: correctQuizNumbers,
    duration: duration
  }

  const response = await axios({
    url: `${process.env.REACT_APP_SERVER_URL}/quiz/save`,
    method: "POST",
    withCredentials: true,
    data: body
  })

  return response.status;
}

export default saveInCollction;
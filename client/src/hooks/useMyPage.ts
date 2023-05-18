import axios from "axios";
import { useEffect, useState } from "react"

interface TRecord {
  _id: string;
  score: number;
  quizTeam: string;
}

const useMyPage = () => {
  const [record, setRecord] = useState<TRecord[]>([]);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_SERVER_URL}/mypage/record`,
      method: "GET",
      withCredentials: true,
    }).then((response) => { 
      setRecord(response.data.record);
      setStatus(200);
    }).catch((e) => {
      console.error(e);
      setStatus(404);
    })
  }, [])

  return {
    record,
    status
  }
}

export default useMyPage;
import axios from "axios";
import { useEffect, useState } from "react";

interface Tchart {
  _id: string;
  correctQuizNumbers?: number;
  duration?: number;
  score: number;
  quizTeam: string;
  username: string;
}

const useChart = () => {
  const [chart, setChart] = useState<Tchart[]>([]);
  const [status, setStatus] = useState<number>(0);
  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_SERVER_URL}/chart/get`,
      method: "GET",
      withCredentials: true,
    }).then((response) => {
      console.log(response);
      setChart(response.data.charts);
      setStatus(200);
    }).catch((e) => {
      setStatus(404);
    })
  }, [])

  return {
    chart,
    status
  };
}

export default useChart;
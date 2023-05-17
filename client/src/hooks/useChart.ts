import axios from "axios";
import { useState } from "react";


const useChart = () => {
  const [chart, setChart] = useState([]);
  const [status, setStatus] = useState<number>(0);

  axios({
    url: `${process.env.REACT_APP_SERVER_URL}/chart/get`,
    method: "GET"
  })
    .then((response) => {
      setChart(response.data);
      setStatus(200);
    })
    .catch((e) => {
      console.log(e);
      setStatus(404);
    })

    return { chart, status };
}

export default useChart;
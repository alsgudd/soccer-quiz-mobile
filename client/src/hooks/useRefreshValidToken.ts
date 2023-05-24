import { useEffect, useState } from "react"
import axios from "axios";
import { IsLoggedInState } from "src/recoil";
import { useSetRecoilState } from "recoil";


const useRefreshValidToken = () => {
  const setIsLoggedIn = useSetRecoilState(IsLoggedInState)
  const [status, setStatus] = useState(0);

  useEffect(() => {
    checkValid();
    const intervalId = setInterval(checkValid, 30 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [])
  const checkValid = () => {
    axios({
      url: `${process.env.REACT_APP_SERVER_URL}/auth/valid`,
      method: "GET",
      withCredentials: true
    })
      .then((response) => {
        setStatus(200);
        // setIsLoggedIn(true);
      })
      .catch((e) => {
        if (e.response.status === 404) {
          // Not found
          setStatus(404);
          setIsLoggedIn(false);
        } else {
          setStatus(403)
          setIsLoggedIn(false);
        }
      })
  }

  return {
    status
  }
}

export default useRefreshValidToken;
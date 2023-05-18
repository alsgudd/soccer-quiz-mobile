import jwt from "jsonwebtoken"

const getname = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if(!token) throw new Error();
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if(!data) throw new Error();
    const username = data.username;
    res.status(200).json({ username: username })
  } catch (error) {
    res.status(404).json(error);
  }
}

export default getname;
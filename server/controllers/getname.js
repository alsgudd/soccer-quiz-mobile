import jwt from "jsonwebtoken"

const getname = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if(!token) throw new Error();
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if(!data || !data.userId || !data.username) throw new Error();
    res.status(200).json({ username: data.username, userId: data.userId })
  } catch (error) {
    res.status(404).json(error);
  }
}

export default getname;
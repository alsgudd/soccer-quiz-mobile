import jwt from 'jsonwebtoken'


const validtoken = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) throw 404;
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!data) throw new Error('JWT Token is Expired');
    res.status(200).json({ message: "token is still valid." });
  } catch (error) {
    if (error === 404) {
      res.status(404).json(error);
    } else {
      res.cookie('accessToken', '');
      res.status(403).json(error);
    }
  }
}

export default validtoken;
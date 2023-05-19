const logout = async (req, res) => {
  try {
    res.cookie('accessToken', '')
    res.status(200).json('Logout Success');
  } catch (error) {
    res.status(500).json(error);
  }
}

export default logout;
const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (req, res, next) => {
  try {
    // console.log(req);
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // console.log(decodedToken);
    req.userData = {
      userId: decodedToken.userId,
      userName: decodedToken.userName,
    };
    console.log("req.userdata:", req.userData);

    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Auth failed!", ErrorMessage: error.message });
  }
};

const jwt = require("jsonwebtoken");
const { unauthorized } = require("../constants/statusCodes");

const verifyToken = (req, res, next) => {
  // get token from headers
  const token = req.header("Authorization"); // format: 'Bearer <token>'

  if (!token) {
    return res.status(unauthorized).json({ message: "Unauthorized" });
  }

  // verify the validaty of the token
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(unauthorized).json({ message: "Unauthorized" });
  }
};

module.exports = verifyToken;

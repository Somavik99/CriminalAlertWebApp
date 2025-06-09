const jwt = require("jsonwebtoken");
const User = require("../Schema/usersSchema");


export async function authUserVerification(req, res, next) {
  const authUserToken = req.headers.authorization;
  if (!authUserToken || !authUserToken.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid access, try again... " });
  }

  try {
    const token = authUserToken.split("")[1];
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decodeToken.Id;
    req.role = decodeToken.role;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired, please login again",
      });
    }
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}




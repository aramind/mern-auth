const jwt = require("jsonwebtoken");
const errorHandler = require("./error");

const verifyToken = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "Access denied"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token is not valid");
    req.user = user;
    next();
  });
};

module.exports = verifyToken;

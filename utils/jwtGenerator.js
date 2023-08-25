const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.jwtGenerator = (user) => {
  const payload = {
    username: user.username,
  };
  return jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: "1d" });
};

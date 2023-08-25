const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authorization = (req, res, next) => {
  const token = req.header("token");

  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
      if (err) {
        return res.status(403).json({ error: err.message });
      } else {
        next();
      }
    });
  } else {
    return res.status(403).json({ error: "No authorization." });
  }
};

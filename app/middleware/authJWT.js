const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  const secret = process.env.JWT_ACCESS_SECRET;

  if (!secret) {
    throw new Error("Please Define JWT_ACCESS_SECRET");
  }

  const cookie = req.headers.cookie;
  if (!cookie) {
    return res.status(403).send({
      message: "No Token provided!",
    });
  }
  const arrTok = cookie.split(';').reduce(
    (cookies, cookie) => {
        const [name, val] = cookie.split('=').map(c => c.trim());
        cookies[name] = val;
        return cookies;
    }, {});;
  const token = arrTok['accessToken'];
  if (!token) {
    return res.status(403).send({
      message: "No Token provided!",
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    const data = decoded.data;
    req.uid = data.uid;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};

module.exports = authJwt;
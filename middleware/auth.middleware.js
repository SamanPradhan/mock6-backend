const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(400).send({ msg: "Please login first" });
  }
  const decode = jwt.verify(token, process.env.secret);
  if (decode) {
    req.body.username = decode.username;
    next();
  } else {
    return res.status(400).send({ msg: "Please login first" });
  }
};

module.exports = { auth };

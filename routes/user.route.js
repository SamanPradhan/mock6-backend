const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../models/user.model");
const userRouter = express.Router();
require("dotenv").config();
//register
userRouter.post("/register", async (req, res) => {
  try {
    const { username, avatar, email, password } = req.body;
    bcrypt.hash(password, 13, async (err, hash) => {
      if (err) {
        return res.status(400).send({ Error: err });
      }
      const newUser = new userModel({
        username,
        avatar,
        email,
        password: hash,
      });
      await newUser.save();
      res.status(200).json("New User Created");
    });
  } catch (error) {
    return res.status(400).send({ Error: error });
  }
});

//login
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser) {
      return res.status(404).send({ Error: "Email not registered" });
    }

    bcrypt.compare(password, findUser.password, async (err, result) => {
      if (err) {
        return res.status(400).send({ Error: err });
      }
      if (result) {
        const getToken = jwt.sign(
          { username: findUser.username },
          process.env.secret
        );
        res.status(200).json({ msg: "login successful", token: getToken });
      }
    });
  } catch (error) {
    return res.status(400).send({ Error: error });
  }
});
module.exports = { userRouter };

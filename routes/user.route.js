const express = require("express");
const userRouter = express.Router();

const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  try {
    bcrypt.hash(password, 4, async (err, hash) => {
      if (err) {
        console.log("Initial", err);
      } else {
        const user = new UserModel({ name, email, password: hash, gender });
        await user.save();
        console.log("Registered used:", user);
        res.send({ msg: "Registeration completed successfully" });
      }
    });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Registration failed" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    console.log(user);
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (error, result) => {
        console.log(result);
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, process.env.key);
          res.send({ msg: "Login Successfull", token: token });
        } else {
          res.send({ msg: "Login Failure" });
        }
      });
    } else {
      res.send({ msg: "Login Failure, Wrong credentials" });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = { userRouter };

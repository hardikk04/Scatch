const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const userModel = require("../models/user-model");

const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      bcrypt.hash(password, 12, async (err, hash) => {
        const newUser = await userModel.create({
          fullname,
          email,
          password: hash,
        });
        const token = generateToken(newUser);
        res.cookie("token", token);
        res.status(200).redirect("/shop");
      });
    } else {
      req.flash("error", "User already exists");
      res.status(400).send("User already exists");
    }
  } catch (error) {}
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      req.flash("error", "Email or password wrong");
      return res.status(404).send("Email or password wrong");
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = generateToken(user);
        res.cookie("token", token);
        res.status(200).redirect("/shop");
      } else {
        req.flash("error", "Email or password wrong");
        res.status(404).send("Email or password wrong");
      }
    });
  } catch (error) {}
};

const logoutUser = async (req, res) => {
  res.cookie("token", "");
  res.status(200).redirect("/");
};

module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.logoutUser = logoutUser;

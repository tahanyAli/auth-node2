"use strict";
const User = require("../models").users;
const bcrypt = require("bcrypt");
const base64 = require("base-64");
const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    };
    const user = await User.create(data);
    if (user) {
      res.status(201).json(user);
    }
  } catch (e) {
    console.log(e);
  }
};
const login = async (req, res) => {
  const basicHeader = req.headers.authorization.split(" ");
  const encodedValue = basicHeader.pop();
  const decodedValue = base64.decode(encodedValue);
  const [email, password] = decodedValue.split(":");
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  console.log(decodedValue);
  if (user) {
    const isSame = await bcrypt.compare(password, user.password);

    if (isSame) {
      return res.status(200).json(user);
    } else {
      return res.status(401).send("you are not authorized");
    }
  } else {
    return res.status(401).send("you are not authorized");
  }
  
};
const allUser = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};
module.exports = {
  signup,
  login,
  allUser,
};

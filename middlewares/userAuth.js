"use strict";

const User = require("../models").users;

const saveUser = async (req, res, next) => {
  try {
    //search for the username in the database
    const username = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });
    if (username) {
      return res.status(409).send("Username already taken");
    }
    //search for the email in the database
    const email = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (email) {
        return res.status(409).send("Email already taken");
      }
  } catch (err) {
    console.log(err);
  }

  next();
};
module.exports = {
    saveUser
}

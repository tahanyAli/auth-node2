"use strict";
const { users } = require("../models");
module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next("You're not authorized!!!!!!!");
  }
  // console.log(req.headers.authorization);
  //get bearer token
  const token = req.headers.authorization.split(" ").pop();
  try {
    const validUser = users.authenticateToken(token);
    const userInfo = await users.findOne({
      where: { userName: validUser.userName },
    });
    if (userInfo) {
      req.user = userInfo;
      req.token = userInfo.token;
      next();
    } else {
      next("You're not authorized!!!!!!!");
    }
    // console.log(token);
    console.log(validUser, "valid user");
    console.log(userInfo);
  } catch (e) {
    next(e.message || e);
  }
};

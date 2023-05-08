"use strict";
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return jwt.sign(
          {
            userName: this.userName,
          },
          process.env.JWT_SECRET
        );
      },
      set(tokenObj) {
        return jwt.sign(tokenObj, process.env.JWT_SECRET);
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "user"],
      allowNull: false,
      defaultValue: "user",
    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get: function () {
        const acl = {
          admin: ["read", "create", "delete", "update"],
          user: ["read", "create"],
        }
        return acl[this.role]
      }
    }
    
  },
  {
    freezeTableName: true,
  }
  
  );
  User.authenticateToken = (token) => {
    // console.log(token, "from models");
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return err;
      } else {
        return decoded;
      }
    });
  };
  return User;
};

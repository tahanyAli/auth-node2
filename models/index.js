"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const POSTGRES_URI = "postgres:tahany:12345@localhost:5432/auth";
const sequelize = new Sequelize(POSTGRES_URI);

// const users = require('./user.model');

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected to postgress");
  })
  .catch((err) => {
    console.log(err);
  });
// const userModel = users(sequelize, DataTypes);
const db = {};
db.sequelize = sequelize;
// db.users = userModel;
db.users = require('./user.model')(sequelize, DataTypes);
db.news = require('./news.model')(sequelize, DataTypes);

db.users.hasMany(db.news, {foreignKey: 'ownerID', sourceKey: 'id'});
db.news.belongsTo(db.users, {foreignKey: 'ownerID', sourceKey: 'id'})
module.exports = db;

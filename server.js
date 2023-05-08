"use strict";

const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const db = require("./models");
const userRouter = require("./routes/user.routes");
const newsRouter = require("./routes/news.routes");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello from the other side");
});
app.use(userRouter);
app.use(newsRouter);
db.sequelize.sync().then(() => {
  app.listen(3002, () => console.log("up and running on port 3002"));
});

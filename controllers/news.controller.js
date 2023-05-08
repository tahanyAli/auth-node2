"use strict";

const News = require("../models").news;
const { users } = require("../models");
//OR
// const { news } = require('../models');
const getAllNews = async (req, res) => {
  try {
    const news = await News.findAll({ include: users });
    res.status(200).json(news);
  } catch (e) {
    console.log(e);
  }
};

const createNews = async (req, res) => {
  try {
    const data = req.body;
    const createdNews = await News.create(data);
    res.status(201).json(createdNews);
  } catch (e) {
    console.log(e);
  }
};
const deleteNew = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.user.capabilities.includes("delete")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const deletedNews = await News.destroy({where: {id}});
    res.status(409).json({message: 'News has been deleted'})
  } catch (e) {}
};
module.exports = {
  getAllNews,
  createNews,
  deleteNew,
};

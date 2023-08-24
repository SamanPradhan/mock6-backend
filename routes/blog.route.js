const express = require("express");
const { blogModel } = require("../models/blog.model");
const blogRouter = express.Router();
require("dotenv").config();
//post
blogRouter.post("/", async (req, res) => {
  try {
    const newblog = new blogModel({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      username: req.body.username,
      date: req.body.date,
    });
    console.log(newblog);
    await newblog.save();
    res.status(200).json("New blog Created");
  } catch (error) {
    return res.status(400).send({ Error: error });
  }
});

//get all
blogRouter.get("/", async (req, res) => {
  try {
    let category = req.query.category;
    let title = req.query.title;
    let sort = req.query.sort;
    let order = req.query.order;

    if (category) {
      var findblog = await blogModel.find({ category });
    } else if (title) {
      var findblog = await blogModel.find({ title });
    } else if (sort) {
      if (order == "asc") {
        var findblog = await blogModel.find().sort({ date: 1 });
      } else if (order == "desc") {
        var findblog = await blogModel.find().sort({ date: -1 });
      }
    } else {
      var findblog = await blogModel.find();
    }

    res.status(200).json(findblog);
  } catch (error) {
    return res.status(400).send({ Error: error });
  }
});

//update
blogRouter.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await blogModel.findByIdAndUpdate(id, req.body);

    res.status(200).send({ msg: "Blog is updated" });
  } catch (error) {
    return res.status(400).send({ Error: error });
  }
});

//delete
blogRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await blogModel.findByIdAndDelete(id);

    res.status(200).send({ msg: "Blog is deleted" });
  } catch (error) {
    return res.status(400).send({ Error: error });
  }
});
module.exports = { blogRouter };

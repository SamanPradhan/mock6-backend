const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({ username: String, content: String });
const blogSchema = mongoose.Schema({
  username: String,
  title: String,
  content: String,
  category: String,
  date: Date,
  likes: Number,
  comments: [commentSchema],
});

const blogModel = mongoose.model("blog", blogSchema);

module.exports = { blogModel };

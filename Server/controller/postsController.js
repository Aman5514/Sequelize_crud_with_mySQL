const fs = require('fs');
const Posts = require("../models/Posts");

const addPost = async (req, res) => {
await Posts.create({
  image:req.file.filename,
  summary:req.body.summary
})
  res.status(200).send("success")
};

const allPosts = async (req, res) => {
  const data = await Posts.findAll();
  const response = {
    data: data,
  };
  res.status(200).json(response);
};

const deletePost = async (req, res) => {
  const data = await Posts.destroy({
    where: {
      image: req.body.image,
    },
  });
};

module.exports = { addPost, allPosts , deletePost };

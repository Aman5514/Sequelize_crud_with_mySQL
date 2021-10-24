const Posts = require("../models/Posts");

const addPost = async (req, res) => {
  const data = await Posts.create({
    image: req.body.image,
    summary: req.body.summary,
    
  });
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
      id: req.body.id,
    },
  });
};

module.exports = { addPost, allPosts , deletePost };

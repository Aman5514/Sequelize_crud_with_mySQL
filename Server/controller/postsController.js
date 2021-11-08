const fs = require("fs");
const path = require("path");
const db = require("../utilities/database");
const Posts = db.Posts;

const addPost = async (req, res) => {

const userDetails = (req.body.userId).split(",");
  await Posts.create({
    image: req.file.filename,
    summary: req.body.summary,
    category: req.body.category,
    user_id: userDetails[0],
    user_name:userDetails[1]
  });

  res.status(200).send("success");
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
  fs.unlink(path.join("image/" + req.body.image), function (err) {
    if (err) {
      console.log("Error :",err.message);
    }
  });
};

module.exports = { addPost, allPosts, deletePost };

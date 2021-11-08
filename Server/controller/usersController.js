const db = require('../utilities/database');
const Users = db.Users;
const Posts = db.Posts;

const addUser = async (req, res) => {
  const data = await Users.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  });

  const response = {
    message: "successfull data added",
    data: 200,
  };

  res.status(200).json(response);
};

const update = async (req, res) => {
  const data = await Users.update(
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  );

  const response = {
    message: "Update successfull",
    data: 200,
  };

  res.status(200).json(response);
};

const deleteUser = async (req, res) => {
  const user = await Users.destroy({
    where: {
      id: req.body.id,
    },
  });
  const userPost = await Posts.destroy({
    where: {
      user_id: req.body.id,
    },
  });

  const response = {
    message: "successfull data deleted",
    data: 200,
  };

  res.status(200).json(response);
};

const readAll = async (req, res) => {
  const data = await Users.findAll({});
  const response = {
    data: data,
  };
  res.status(200).json(response);
};


const userPost = async(req , res)=>{
  const data = await Users.findAll({
    include:[{
      model:Posts,
      attributes:['category','image','summary','createdAt']
    }],
  });
  res.status(200).json(data);
}


module.exports = {
  readAll,
  addUser,
  update,
  deleteUser,
  userPost,
};

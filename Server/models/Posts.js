const { Sequelize, DataTypes } = require("sequelize");

const database = require("../utilities/database");

const Posts = database.define("posts", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
    allowNull: false
  },
  image:{
    type: DataTypes.BLOB,
    allowNull: false
  },
  summary: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Posts;

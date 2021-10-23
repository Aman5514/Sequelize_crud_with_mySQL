const { Sequelize, DataTypes } = require("sequelize");

const database = require("../utilities/database");

const Users = database.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
});

module.exports = Users;

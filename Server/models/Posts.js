const {Sequelize , DataTypes} = require('sequelize');

const database = require('../utilities/database');

const Posts = database.define('posts',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
    },
    summary:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = Posts;
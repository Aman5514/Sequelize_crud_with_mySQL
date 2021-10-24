const Sequelize = require('sequelize');

const database = new Sequelize('Facebook','root','amanadmin5514',{
    dialect:'mysql',
    host:'localhost',
    logging:false
});

module.exports = database;
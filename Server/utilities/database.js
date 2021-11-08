const dbConfig = require("../config/config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging:dbConfig.Logging,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require('../models/Users')(sequelize, Sequelize);
db.Posts = require('../models/Posts')(sequelize, Sequelize);

db.sequelize.sync().then(() => {
    console.log("Database successfully connnected")
})

.catch((err) =>
{
    console.log("ERROR : " + err.message)
})

// ---------- one to many ------------//

db.Users.hasMany(db.Posts,{foreignKey:'user_id'});
db.Posts.belongsTo(db.Users,{foreignKey:'user_id'});

module.exports = db;
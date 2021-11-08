module.exports = (sequelize , DataTypes)=>{

const Users = sequelize.define("users", {
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
return Users;
}

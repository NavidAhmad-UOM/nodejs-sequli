'use strict';
module.exports = (sequelize, DataTypes) => {
  const Home = sequelize.define('Home', {
    clientId: DataTypes.INTEGER,
    location: DataTypes.STRING,
    area: DataTypes.STRING,
    rent: DataTypes.BOOLEAN,
    amount: DataTypes.STRING,
    rooms: DataTypes.INTEGER,
    bath: DataTypes.INTEGER,
    floors: DataTypes.INTEGER,
    confirmed: DataTypes.BOOLEAN,
    direct: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER
  }, {});
  Home.associate = function(models) {
    // associations can be defined here
    Home.belongsTo(models.Clients, {foreignKey: 'clientId', targetKey: 'id'});
    Home.belongsTo(models.Users, {foreignKey: 'createdBy', targetKey: 'id'});
  };
  return Home;
};
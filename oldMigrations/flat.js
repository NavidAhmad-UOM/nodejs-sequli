'use strict';
module.exports = (sequelize, DataTypes) => {
  const Flat = sequelize.define('Flat', {
    clientId: DataTypes.INTEGER,
    location: DataTypes.STRING,
    area: DataTypes.STRING,
    rent: DataTypes.BOOLEAN,
    amount: DataTypes.STRING,
    rooms: DataTypes.INTEGER,
    bath: DataTypes.INTEGER,
    confirmed: DataTypes.BOOLEAN,
    direct: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER
  }, {});
  Flat.associate = function(models) {
    // associations can be defined here
    Flat.belongsTo(models.Clients, {foreignKey: 'clientId', targetKey: 'id'});
    Flat.belongsTo(models.Users, {foreignKey: 'createdBy', targetKey: 'id'});
  };
  return Flat;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Plots = sequelize.define('Plots', {
    clientId: DataTypes.STRING,
    location: DataTypes.STRING,
    area: DataTypes.STRING,
    amount: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    type: DataTypes.STRING,
    forRent: DataTypes.BOOLEAN,
    confirmed: DataTypes.BOOLEAN,
    direct: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER
  }, {});
  Plots.associate = function(models) {
    // associations can be defined here
    Plots.belongsTo(models.Clients, {foreignKey: 'clientId', targetKey: 'id'});
    Plots.belongsTo(models.Users, {foreignKey: 'createdBy', targetKey: 'id'});
  };
  return Plots;
};
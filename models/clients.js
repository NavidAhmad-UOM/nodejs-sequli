'use strict';
module.exports = (sequelize, DataTypes) => {
  const Clients = sequelize.define('Clients', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber1: DataTypes.STRING,
    phoneNumber2: DataTypes.STRING,
    direct: DataTypes.BOOLEAN,
    investor: DataTypes.BOOLEAN,
    clientPicture: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedBy: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  Clients.associate = function(models) {
    // associations can be defined here
    Clients.belongsTo(models.User, {foreignKey: 'createdBy', targetKey: 'id'});
    Clients.belongsTo(models.User, {foreignKey: 'updatedBy', targetKey: 'id'});
    Clients.belongsTo(models.User, {foreignKey: 'deletedBy', targetKey: 'id'});
  };
  return Clients;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Clients = sequelize.define('Clients', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    createdBy: DataTypes.INTEGER
  }, {});
  Clients.associate = function(models) {
    // associations can be defined here
    Clients.belongsTo(models.Users, {foreignKey: 'createdBy', targetKey: 'id'})
  };
  return Clients;
};

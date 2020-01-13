'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
    clientId: DataTypes.INTEGER,
    location: DataTypes.STRING,
    area: DataTypes.STRING,
    rent: DataTypes.BOOLEAN,
    amount: DataTypes.STRING,
    confirmed: DataTypes.BOOLEAN,
    direct: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER
  }, {});
  Shop.associate = function(models) {
    // associations can be defined here
    Shop.belongsTo(models.Clients, {foreignKey: 'clientId', targetKey: 'id'})
    Shop.belongsTo(models.Users, {foreignKey: 'createdBy', targetKey: 'id'});
  };
  return Shop;
};
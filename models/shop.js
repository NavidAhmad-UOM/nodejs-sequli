'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
    clientId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    Location: DataTypes.STRING,
    shopPicture: DataTypes.STRING,
    forRent: DataTypes.BOOLEAN,
    confirmed: DataTypes.BOOLEAN,
    direct: DataTypes.BOOLEAN,
    phone1: DataTypes.STRING,
    phone2: DataTypes.STRING,
    marlas: DataTypes.FLOAT,
    sqft: DataTypes.FLOAT,
    amount: DataTypes.INTEGER,
    notes: DataTypes.TEXT,
    lenght: DataTypes.INTEGER,
    width: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedBy: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  Shop.associate = function(models) {
    // associations can be defined here
  };
  return Shop;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Flat = sequelize.define('Flat', {
    clientId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    Location: DataTypes.STRING,
    flatPicture: DataTypes.STRING,
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
    rooms: DataTypes.INTEGER,
    floorNo: DataTypes.INTEGER,
    bath:DataTypes.INTEGER,
    isResidental: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedBy: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  Flat.associate = function(models) {
    // associations can be defined here
    Flat.belongsTo(models.Clients, {foreignKey: 'clientId', targetKey: 'id'});
    Flat.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'id'});
    Flat.belongsTo(models.User, {foreignKey: 'createdBy', targetKey: 'id'});
    Flat.belongsTo(models.User, {foreignKey: 'updatedBy', targetKey: 'id'});
    Flat.belongsTo(models.User, {foreignKey: 'deletedBy', targetKey: 'id'});
  };
  return Flat;
};
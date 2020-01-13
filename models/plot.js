'use strict';
module.exports = (sequelize, DataTypes) => {
  const Plot = sequelize.define('Plot', {
    clientId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    Location: DataTypes.STRING,
    plotPicture: DataTypes.STRING,
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
    isResidental: DataTypes.BOOLEAN,
    isDeleted: DataTypes.BOOLEAN,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER,
    deletedBy: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {});
  Plot.associate = function(models) {
    // associations can be defined here
    Plot.belongsTo(models.Clients, {foreignKey: 'clientId', targetKey: 'id'});
    Plot.belongsTo(models.User, {foreignKey: 'userId', targetKey: 'id'});
    Plot.belongsTo(models.User, {foreignKey: 'createdBy', targetKey: 'id'});
    Plot.belongsTo(models.User, {foreignKey: 'updatedBy', targetKey: 'id'});
    Plot.belongsTo(models.User, {foreignKey: 'deletedBy', targetKey: 'id'});
  };
  return Plot;
};
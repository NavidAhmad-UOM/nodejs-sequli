'use strict';
module.exports = (sequelize, DataTypes) => {
  const TestColumn = sequelize.define('TestColumn', {
    firstName: DataTypes.STRING
  }, {});
  TestColumn.associate = function(models) {
    // associations can be defined here
  };
  return TestColumn;
};
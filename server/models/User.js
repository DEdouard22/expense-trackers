'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Transaction);
    User.hasMany(models.Paymentmethod);
  };
  return User;
};
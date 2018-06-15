'use strict';
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('postgres://postgres@localhost:5432/expenseTracker');

// const User = sequelize.define('user', {
//   username: Sequelize.STRING,
//   password: Sequelize.STRING,
//   github_id: Sequelize.INTEGER,
// });

// User.sync();

// module.exports = User;

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    github_id: DataTypes.STRING,
    facebook_id: DataTypes.STRING,
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Transaction);
    User.hasMany(models.Paymentmethod);
  };
  return User;
};
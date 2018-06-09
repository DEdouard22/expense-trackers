'use strict';
module.exports = (sequelize, DataTypes) => {
  var Paymentmethod = sequelize.define('Paymentmethod', {
    description: DataTypes.STRING,
  }, {});
  Paymentmethod.associate = function(models) {
    Paymentmethod.belongsTo(models.User);
    Paymentmethod.hasMany(models.Transaction);
  };
  return Paymentmethod;
};
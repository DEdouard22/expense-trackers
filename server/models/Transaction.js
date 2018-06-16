'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    description: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    frequency:DataTypes.STRING,
    category:DataTypes.STRING,
    type:DataTypes.STRING,
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.User);
    Transaction.belongsTo(models.Paymentmethod);
  };
  return Transaction;
};
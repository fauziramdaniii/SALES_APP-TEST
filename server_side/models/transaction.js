'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transaction', {
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {});
  
  Transaction.associate = function(models) {
    Transaction.hasMany(models.detail_transaction, { foreignKey: 'id_transaction' });
  };
  
  return Transaction;
};

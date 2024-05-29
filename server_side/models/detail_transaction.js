'use strict';
module.exports = (sequelize, DataTypes) => {
  const DetailTransaction = sequelize.define('detail_transaction', {
    id_transaction: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'transactions',
        key: 'id'
      }
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  
  DetailTransaction.associate = function(models) {
    DetailTransaction.belongsTo(models.transaction, { foreignKey: 'id_transaction' });
    DetailTransaction.belongsTo(models.product, { foreignKey: 'id_product' });
  };
  
  return DetailTransaction;
};

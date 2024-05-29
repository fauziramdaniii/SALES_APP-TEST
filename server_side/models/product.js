'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_product_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product_types',
        key: 'id'
      }
    }
  }, {});

  Product.associate = function(models) {
    Product.belongsTo(models.product_type, { foreignKey: 'id_product_type' });
  };

  return Product;
};

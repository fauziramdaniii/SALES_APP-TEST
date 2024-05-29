'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductType = sequelize.define('product_type', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  
  ProductType.associate = function(models) {
    ProductType.hasMany(models.product, { foreignKey: 'id_product_type' });
  };
  
  return ProductType;
};

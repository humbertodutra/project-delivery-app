
module.exports = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('sales_products', {
    saleId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'id'
      },
    },
    quantity: DataTypes.INTEGER,
  },
    {
      timestamps: false,
      underscored: true,
      tableName: 'salesProducts',
    });

  salesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products,
      {
        foreignKey: 'saleId',
        as: 'sale',
        through: salesProducts,
        otherKey: 'productId'
      });
    models.products.belongsToMany(models.sales, {
      foreignKey: 'productId',
      as: 'product',
      through: salesProducts,
      otherKey: 'saleId'
    });
  };

  return salesProducts;
};

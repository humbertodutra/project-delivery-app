
module.exports = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define('salesProducts', {
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
      tableName: 'sales_products',
    });

  salesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products,
      {
        foreignKey: 'saleId',
        as: 'products',
        through: salesProducts,
        otherKey: 'productId'
      });
    models.products.belongsToMany(models.sales, {
      foreignKey: 'productId',
      as: 'sales',
      through: salesProducts,
      otherKey: 'saleId'
    });
  };

  return salesProducts;
};

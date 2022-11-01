
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
      tableName: 'salesProducts',
    });

  salesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products,
      {
        as: 'products',
        through: salesProducts,
        foreignKey: 'product_id',
        otherKey: 'sale_id'
      });
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      through: salesProducts,
      foreignKey: 'sale_id',
      otherKey: 'product_id'
    });
  };

  return salesProducts;
};

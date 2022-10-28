module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define('products', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    urlImage: DataTypes.STRING
  },
    {
      timestamps: false,
      underscored: true,
    });

  // products.associate = (models) => {
  //   products.hasMany(models.salesProduct,
  //     {
  //       foreignKey: 'product_id', as: 'sales_product'
  //     });
  // };

  return products;
};
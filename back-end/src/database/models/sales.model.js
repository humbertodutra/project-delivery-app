module.exports = (sequelize, DataTypes) => {
  const sales = sequelize.define('sales', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    sellerId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    totalPrice: {
      type: DataTypes.DECIMAL
    },
    deliveryAddress: {
      type: DataTypes.STRING
    },
    deliveryNumber: {
      type: DataTypes.STRING
    },
    saleDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    status: 
      DataTypes.STRING,      
  },
    {
      timestamps: false,
      underscored: true,
      tableName: 'sales'
    });

  sales.associate = (models) => {
    sales.belongsTo(models.users,
      {
        foreignKey: 'userId',
        as: 'users',
      }, {
      foreignKey: 'sellerId',
      as: 'seller',
    },
    );
  };

  return sales;
};
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
    role: DataTypes.STRING,
  },
    {
      timestamps: false,
      underscored: true
    });

  // users.associate = (models) => {
  //   users.hasMany(models.sales,
  //     {
  //       foreignKey: 'user_id', as: 'sales'
  //     });
  //   users.hasMany(models.sales, {
  //     foreignKey: 'seller_id', as: 'sales',
  //   })
  // };

  return users;
};
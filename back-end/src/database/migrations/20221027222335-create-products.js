'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        uniqueKey: true
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(4, 2)
      },
      urlImage: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "",
        field: 'url_image'
      },
    })
  },

  async down(queryInterface, _Sequelize) {
    return await queryInterface.dropTable('products');
  }
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('salesProducts', {
      saleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'sale_id',
        references: {
          model: 'sales',
          key: 'id',
        },
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'product_id',
        references: {
          model: 'products',
          key: 'id',
        },
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
    })
  },

  async down(queryInterface, _Sequelize) {
    return queryInterface.dropTable('salesProducts');
  }
};

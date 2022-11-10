
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('sales',
      [
        {
          user_id: 2,
          seller_id: 2,
          total_price: 10.99,
          delivery_address: 'Rua da mata',
          delivery_number: '50',
          status: 'delivered'
        },
        {
          user_id: 3,
          seller_id: 1,
          total_price: 11.99,
          delivery_address: 'Avenida das flores',
          delivery_number: '60',
          status: 'waiting the payment'
        },
        {
          user_id: 3,
          seller_id: 1,
          total_price: 11.99,
          delivery_address: 'Avenida patati flores',
          delivery_number: '6050',
          status: 'payment'
        },
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  },
};

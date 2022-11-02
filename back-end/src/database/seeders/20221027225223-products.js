'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('products',
      [
        {
          name: 'Skol Lata 250ml',
          price: 2.20,
          url_image: 'http://localhost:3001/images/skol_lata_350ml.png',
        },
        {
          name: 'Heineken 600ml',
          price: 7.50,
          url_image: 'http://localhost:3001/images/heineken_600ml.png',
        },
        {
          name: 'Antarctica Pilsen 300ml',
          price: 2.49,
          url_image: 'http://localhost:3001/images/antarctica_pilsen_300ml.png',
        },
        {
          name: 'Brahma 600ml',
          price: 7.50,
          url_image: 'http://localhost:3001/images/brahma_600ml.png',
        },
        {
          name: 'Skol 269ml',
          price: 2.19,
          url_image: 'http://localhost:3001/images/skol_269ml.png',
        },
        {
          name: 'Skol Beats Senses 313ml',
          price: 4.49,
          url_image: 'http://localhost:3001/images/skol_beats_senses_313ml.png',
        },
        {
          name: 'Becks 330ml',
          price: 4.99,
          url_image: 'http://localhost:3001/images/becks_330ml.png',
        },
        {
          name: 'Brahma Duplo Malte 350ml',
          price: 2.79,
          url_image: 'http://localhost:3001/images/brahma_duplo_malte_350ml.png',
        },
        {
          name: 'Becks 600ml',
          price: 8.89,
          url_image: 'http://localhost:3001/images/becks_600ml.png',
        },
        {
          name: 'Skol Beats Senses 269ml',
          price: 3.57,
          url_image: 'http://localhost:3001/images/skol_beats_senses_269ml.png',
        },
        {
          name: 'Stella Artois 275ml',
          price: 3.49,
          url_image: 'http://localhost:3001/images/stella_artois_275ml.png',
        },
      ],
      {},
    );
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
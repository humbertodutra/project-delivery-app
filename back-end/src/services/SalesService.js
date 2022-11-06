const { Sequelize } = require('sequelize');
const { products, sales, salesProducts, users } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const dateFormat = () => {
    const dateNow = new Date();
    const date = new Date(Date.UTC(
        dateNow.getUTCFullYear(),
        dateNow.getUTCMonth(),
        dateNow.getUTCDate(),
        dateNow.getUTCHours(),
        dateNow.getUTCMinutes(),
        dateNow.getUTCSeconds(),
        dateNow.getUTCMilliseconds(),
    ));
    return date;
};

const saleService = {
    getAllSales: async () => {
        const allSales = await sales.findAll();
        return allSales;
    },

    getSaleById: async (id) => {
        const saleById = await sales.findByPk(id, 
            {
                include: [{
                  model: users,
                  as: 'users',
                  attributes: { exclude: ['password'] },
                },
                {
                  model: products,
                  as: 'products',
                  through: {
                    attributes: ['quantity'],
                  },
                },
              ],
              });

              return [saleById];
        },

    create: async (sale, orders) => {
            const newSale = await sequelize.transaction(async (t) => {
              const { id } = await sales.create({
                ...sale, status: 'Pendente', saleDate: dateFormat(),
              }, { transaction: t });
              const productss = orders.map((product) => (
                { saleId: id, productId: product.productId, quantity: product.quantity }
              ));
                
              await salesProducts.bulkCreate(productss, { transaction: t });
          
              return { id };
            });
          
            return newSale;
          },

    updateSaleStatus: async (id, status) => {
        const saleToUpdate = await sales.findAll({ where: { id } });
        if (!saleToUpdate || saleToUpdate.length === 0) return null;
        await sales.update({ status }, { where: { id } });
        return saleToUpdate;
},
    };

module.exports = saleService;
const { Sequelize } = require('sequelize');
const { products, sales, salesProducts, users } = require('../database/models');
const config = require('../database/config/config');



const dateFormat = () => {
  const date = new Date(); 
  const dateFormatPt = new Intl.DateTimeFormat('pt-BR').format(date); 
    return dateFormatPt;
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
                  attributes: ['name', 'price'],
                  through: { as: 'quantity', attributes: ['quantity'] },
                },
            ] });
              console.log(saleById);
              return [saleById];
        },

    create: async (sale, orders) => {
      
    const newSale = await sales.create({...sale, status: 'Pendente'})
   
    async function createSalesProduct(id, orders) {
     const newSaleProducts =  orders.map( (a) =>
        salesProducts.create({ 
          saleId: id, 
          productId: a.productId, 
          quantity: a.quantity } ))

      const [newSaleProductss] = await Promise.all(newSaleProducts);
      console.log(newSaleProductss);
    
      return newSaleProductss;
    }
    console.log(newSale.dataValues)

    createSalesProduct(newSale.dataValues.id, orders)
    return newSale.dataValues;
    
  },

 
    updateSaleStatus: async (id, status) => {
        const saleToUpdate = await sales.findAll({ where: { id } });
        if (!saleToUpdate || saleToUpdate.length === 0) return null;
        await sales.update({ status }, { where: { id } });
        return saleToUpdate;
},  
    };

module.exports = saleService;
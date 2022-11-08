const saleService = require('../services/SalesService'); 

const saleController = {
    getAll: async (req, res) => {
        const sales = await saleService.getAllSales();
        return res.status(200).json(sales);
    },

    getById: async (req, res) => {
        const { id } = req.params;
        const sale = await saleService.getSaleById(id);

        return res.status(200).json(sale);
    },

    create: async (req, res, next) => {
        const { userId,
            sellerId,
            totalPrice,
            deliveryAddress,
            deliveryNumber, orders } = req.body;
            console.log(req.body);
        const createSale = await saleService.create({ userId,
            sellerId,
            totalPrice,
            deliveryAddress,
            deliveryNumber }, orders);
        if (createSale === null) return next({ code: 404, message: 'Can\'t create sale' });
        return res.status(201).json(createSale);
    },

    updateStatus: async (req, res, next) => {
        const { id } = req.params;
        const { status } = req.body;
        const saleUpdate = await saleService.updateSaleStatus(id, status);
        if (saleUpdate === null) return next({ code: 404, message: 'Can\'t find sale' });
        return res.status(200).json(saleUpdate);
        },
};

module.exports = saleController;
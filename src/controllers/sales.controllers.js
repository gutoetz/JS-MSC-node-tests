const sales = require('../services/sales.services');

const getAllSales = async (req, res) => {
  const allSales = await sales.getAllSales();
  res.status(200).json(allSales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const sale = await sales.getSalesById(id);
  if (sale.length < 1) return res.status(404).json({ message: 'Sale not found' });
  res.status(200).json(sale);
};

const createSale = async (req, res, next) => {
  try { 
    const salesBody = req.body;
    const newSales = await sales.createSale(salesBody);
  res.status(201).json(newSales);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
};
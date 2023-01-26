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

const deleteSale = async (req, res) => {
  const { id } = req.params;
  try {
    await sales.deleteSale(id);
    res.status(204).json();
  } catch (error) {
    res.status(404).json({ message: 'Sale not found' });
  }
};

const editSale = async (req, res) => {
  const salesBody = req.body;
  const { id } = req.params;
    try {
      const editedSale = await sales.editSale(salesBody, id);
      res.status(200).json(editedSale);
    } catch (error) {
      if (error.message) {
        const newErr = JSON.parse(error.message);
        return res.status(newErr.status).json({ message: newErr.message });
      } 
      res.status(404).json({ message: 'Sale not found' });
    }
};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
  deleteSale,
  editSale,
};
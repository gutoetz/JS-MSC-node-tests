const product = require('../services/product');

const getAllProducts = async (req, res) => {
  const products = await product.getAllProducts();
  res.status(200).send(products);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const products = await product.getProductsById(id);
  if (products.length < 1) return res.status(404).send({ message: 'Product not found' });
  res.status(200).send(products[0]);
};

module.exports = {
  getAllProducts,
  getProductsById,
};
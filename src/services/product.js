const product = require('../models/product');

const getAllProducts = async () => {
  const products = await product.getAllProducts();
  return products;
};

const getProductsById = async (id) => {
  // validação

  // manda
  const products = await product.getProductsById(id);
  return products;
};

module.exports = {
  getAllProducts,
  getProductsById,
};

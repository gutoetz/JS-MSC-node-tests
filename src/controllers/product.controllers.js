const product = require('../services/product.services');

const getAllProducts = async (req, res) => {
  const products = await product.getAllProducts();
  res.status(200).send(products);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const products = await product.getProductsById(id);
  if (products.length < 1) return res.status(404).send({ message: 'Product not found' });
  res.status(200).send(products);
};

const createProduct = async (req, res, next) => {
  try { 
  const { name } = req.body;
  const newProduct = await product.createProduct(name);
  res.status(201).json({ id: newProduct, name });
  } catch (error) {
    next(error);
  }
};

const editProduct = async (req, res, next) => {
    try { 
      const { name } = req.body;
      const { id } = req.params;
      const editedProduct = await product.editProduct(name, id);
      console.log(editedProduct);
  res.status(200).send({ id, name });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  editProduct,
};
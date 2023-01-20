const product = require('../services/product.services');

const getAllProducts = async (req, res) => {
  const products = await product.getAllProducts();
  res.status(200).send(products);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const products = await product.getProductsById(id);
  if (products.length < 1) return res.status(404).send({ message: 'Product not found' });
  res.status(200).send(...products);
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

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await product.deleteProduct(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const editProduct = async (req, res, next) => {
    try { 
      const { name } = req.body;
      const { id } = req.params;
      const editedProduct = await product.editProduct(name, id);
      if (editedProduct === 'Product Deleted') { res.status(200).send(editedProduct); }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  editProduct,
  deleteProduct,
};
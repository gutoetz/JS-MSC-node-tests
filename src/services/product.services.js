const Joi = require('joi');

const product = require('../models/product.models');

const productSchema = Joi.object({
  name: Joi.string().required().min(5),
});
const getAllProducts = async () => {
  const products = await product.getAllProducts();
  return products;
};

const getProductsById = async (id) => {
  const products = await product.getProductsById(id);
  return products;
};

const createProduct = async (name) => {
  const { error } = productSchema.validate({ name });
  if (error) {
    throw new Error(JSON.stringify({
      status: `${(error.details[0].type === 'string.min') ? 422 : 400}`,
      message: error.message,
    })); 
  }
  const newProduct = await product.createProduct(name);
  return newProduct;
};

const editProduct = async (name, id) => {
  const { error } = productSchema.validate({ name });
  if (error) {
    throw new Error(
      JSON.stringify({
        status: `${error.details[0].type === 'string.min' ? 422 : 400}`,
        message: error.message,
      }),
    );
  }
  const editedProduct = await product.editProduct(name, id);
  return editedProduct;
};

const deleteProduct = async (id) => {
  const findProductById = await product.getProductsById(id);
  if (findProductById.length < 1) {
        throw new Error(
          JSON.stringify({
            status: 404,
            message: 'Product not found',
          }),
        );
  }
  const deletedProduct = await product.deleteProduct(id);
  return deletedProduct;
};

const getBySearch = async (q) => {
  const searchProduct = await product.getBySearch(q);
  return searchProduct;
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  editProduct,
  deleteProduct,
  getBySearch,
};

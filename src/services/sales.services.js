const Joi = require('joi');

const sales = require('../models/sales.models');

// const productSchema = Joi.object({
//   name: Joi.string().required().min(5),
// });
const getAllSales = async () => {
  const allSales = await sales.getAllSales();
  return allSales;
};

const getSalesById = async (id) => {
  const sale = await sales.getSalesById(id);
  return sale;
};

// const createSale = async (name) => {
//   // const { error } = productSchema.validate({ name });
//   // console.log(error);
//   // if (error) {
//   //   throw new Error(JSON.stringify({
//   //     status: `${(error.details[0].type === 'string.min') ? 422 : 400}`,
//   //     message: error.message,
//   //   })); 
//   // }
//   // const newProduct = await product.createProduct(name);
//   // return newProduct;
// };
module.exports = {
  getAllSales,
  getSalesById,
  // createSale,
};

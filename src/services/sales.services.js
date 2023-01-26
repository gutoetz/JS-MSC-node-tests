const Joi = require('joi');

const sales = require('../models/sales.models');
const products = require('../models/product.models');

const salesSchema = Joi.object({
  productId: Joi.number().required().label('productId'),
  quantity: Joi.number().required().min(1).label('quantity'),
}).messages({
  'any.required': '{{#label}} is required',
});
const validateSchema = (salesBody) => {
  salesBody.forEach((sale) => {
    const salesArraySchema = Joi.array().items(salesSchema);
    const { error } = salesArraySchema.validate([sale]);
    if (error) {
      throw new Error(
        JSON.stringify({
          status: `${error.details[0].type === 'any.required' ? 400 : 422}`,
          message: error.message,
        }),
      );
    }
  });
};

const hasInvalidId = async (salesBody) => {
  const checkingSalesProductsIdPromises = await Promise.all(
    salesBody.map((e) => products.getProductsById(e.productId)),
  );
  const solvePromises = checkingSalesProductsIdPromises
    .map(([e]) => e)
    .some((e) => !e);
  if (solvePromises) {
        throw new Error(
          JSON.stringify({
            status: 404,
            message: 'Product not found',
          }),
        ); 
  }
};

const getAllSales = async () => {
  const allSales = await sales.getAllSales();
  return allSales;
};

const getSalesById = async (id) => {
  const sale = await sales.getSalesById(id);
  return sale;
};

const createSale = async (salesBody) => {
  const salesArraySchema = Joi.array().items(salesSchema);
  const { error } = salesArraySchema.validate(salesBody);
  if (error) {
    throw new Error(JSON.stringify({
      status: `${(error.details[0].type === 'any.required') ? 400 : 422}`,
      message: error.message,
    })); 
  }
  await hasInvalidId(salesBody);
  const salesId = await sales.createSaleId();
  const newSalesPromises = await salesBody.map((sale) => sales.createSale({ salesId, ...sale }));
  const newSalesPromisesResolve = await Promise.all(newSalesPromises);
  return { id: salesId, itemsSold: newSalesPromisesResolve };
};

const deleteSale = async (id) => {
  const deletingSale = await sales.deleteSale(id);
  return deletingSale;
};

const editSale = async (salesBody, id) => {
  await validateSchema(salesBody);
  await hasInvalidId(salesBody);
  const checkingId = await sales.getSalesById(id);
  if (checkingId.length < 1) { throw new Error(); }
  const newEditingSalePromises = await salesBody.map((sale) => sales.editSale({ ...sale, id }));
  const ResolvedSales = await Promise.all(newEditingSalePromises);
  const returnSales = {
    saleId: id,
    itemsUpdated: ResolvedSales,
  };
  return returnSales;
};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
  deleteSale,
  editSale,
};

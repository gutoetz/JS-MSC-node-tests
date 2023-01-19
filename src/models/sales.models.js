const { connection } = require('./connection');

const getAllSales = async () => {
  const query = `SELECT b.sale_id AS saleId, a.date, b.product_id AS productId, b.quantity 
  FROM StoreManager.sales AS a INNER JOIN StoreManager.sales_products AS b ON a.id = b.sale_id 
  ORDER BY b.sale_id ASC, b.product_id ASC;`;
  const [allSales] = await connection.execute(query);
  console.log(allSales);
  return allSales;
};

const getSalesById = async (id) => {
 const query = `SELECT a.date, b.product_id AS productId, b.quantity 
  FROM StoreManager.sales AS a INNER JOIN StoreManager.sales_products AS b ON a.id = b.sale_id 
  WHERE b.sale_id = ? ORDER BY b.sale_id ASC, b.product_id ASC;`;
  const [products] = await connection.execute(query, [id]);
  return products;
};

// const createSale = async (name) => {
//   // const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
//   // const [newProduct] = await connection.execute(query, [name]);
//   // return newProduct.insertId;
// };

module.exports = {
  getAllSales,
  getSalesById,
  // createSale,
};

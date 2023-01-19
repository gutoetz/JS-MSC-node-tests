const { connection } = require('./connection');

const getAllSales = async () => {
  const query = `SELECT b.sale_id AS saleId, a.date, b.product_id AS productId, b.quantity 
  FROM StoreManager.sales AS a INNER JOIN StoreManager.sales_products AS b ON a.id = b.sale_id 
  ORDER BY b.sale_id ASC, b.product_id ASC;`;
  const [allSales] = await connection.execute(query);
  return allSales;
};

const getSalesById = async (id) => {
 const query = `SELECT a.date, b.product_id AS productId, b.quantity 
  FROM StoreManager.sales AS a INNER JOIN StoreManager.sales_products AS b ON a.id = b.sale_id 
  WHERE b.sale_id = ? ORDER BY b.sale_id ASC, b.product_id ASC;`;
  const [products] = await connection.execute(query, [id]);
  return products;
};

const createSaleId = async () => {
  const query = 'INSERT INTO StoreManager.sales VALUES ();';
  const [newSaleId] = await connection.execute(query);
  return newSaleId.insertId;
};

const createSale = async (saleBody) => {
  const { salesId, productId, quantity } = saleBody;
  const query = `INSERT INTO StoreManager.sales_products
  (sale_id, product_id, quantity) VALUES (?,?,?)`;
  const [newProduct] = await connection.execute(query, [salesId, productId, quantity]);
  if (newProduct.affectedRows === 1) return { productId, quantity };
};

module.exports = {
  getAllSales,
  getSalesById,
  createSale,
  createSaleId,
};

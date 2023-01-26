const express = require('express');
const product = require('./controllers/product.controllers');
const sales = require('./controllers/sales.controllers');

const app = express();
app.use(express.json());
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', product.getAllProducts);
app.get('/products/:id', product.getProductsById);
app.post('/products', product.createProduct);
app.delete('/products/:id', product.deleteProduct);
app.put('/products/:id', product.editProduct);

app.get('/sales', sales.getAllSales);
app.get('/sales/:id', sales.getSalesById);
app.post('/sales', sales.createSale);

app.use((error, req, res, _next) => {
  const newError = JSON.parse(error.message);
  if (newError) {
    return res.status(newError.status).json({ message: newError.message });
  }
  return res.status(500).json({ message: 'internal service error' });
});
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
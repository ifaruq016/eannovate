module.exports = function(app) {
  const product = require('../controllers/productController');

  app.route('/api/product/insert')
    .post(product.insertProductC);
  
  app.route('/api/product/update')
    .put(product.updateProduct);
  
  app.route('/api/product/getAll')
    .get(product.getAllProduct);
  
  app.route('/api/product/get/:id')
    .get(product.getProduct);

  app.route('/api/product/delete/:id')
    .delete(product.delProduct);
};
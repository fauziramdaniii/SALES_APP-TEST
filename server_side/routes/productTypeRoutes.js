const express = require('express');
const router = express.Router();
const productTypeController = require('../controllers/productTypeController');

router.post('/product_type', productTypeController.createProductType);
router.get('/product_type', productTypeController.getProductTypes);
router.get('/product_type/:id', productTypeController.getProductTypeById);
router.put('/product_type/:id', productTypeController.updateProductType);
router.delete('/product_type/:id', productTypeController.deleteProductType);

module.exports = router;

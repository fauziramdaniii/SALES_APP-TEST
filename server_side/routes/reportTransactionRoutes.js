const express = require('express');
const router = express.Router();
const { getTransactionsByProductType } = require('../controllers/reportTransactionController');

router.get('/transactions-by-product-type', getTransactionsByProductType);

module.exports = router;

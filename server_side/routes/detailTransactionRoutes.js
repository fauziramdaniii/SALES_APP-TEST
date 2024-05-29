const express = require('express');
const router = express.Router();
const detailTransactionController = require('../controllers/detailTransactionController');

router.get('/detail_transactions', detailTransactionController.getDetailTransactions);
router.get('/detail_transactions/:id', detailTransactionController.getDetailTransactionById);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getDetailTransactionsByTransactionId } = require('../controllers/detailTransactionController');

router.get('/detail_transactions/:idTransaction', getDetailTransactionsByTransactionId);

module.exports = router;

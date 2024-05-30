const { detail_transaction: DetailTransaction, product: Product, transaction: Transaction } = require('../models');


const getDetailTransactionsByTransactionId = async (req, res) => {
  try {
    const { idTransaction } = req.params;
    const detailTransactions = await DetailTransaction.findAll({
      where: { id_transaction: idTransaction },
      include: [
        { model: Product, as: 'product' },
        { model: Transaction, as: 'transaction' }
      ]
    });

    if (!detailTransactions.length) {
      return res.status(404).json({ error: 'Detail Transaction not found' });
    }

    res.json(detailTransactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getDetailTransactionsByTransactionId,
};

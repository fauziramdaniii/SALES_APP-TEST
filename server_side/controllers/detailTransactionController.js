const db = require('../models');

const getDetailTransactions = async (req, res) => {
  try {
    const detailTransactions = await db.detail_transaction.findAll({
      include: [db.product, db.transaction]
    });
    res.status(200).json(detailTransactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDetailTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const detailTransaction = await db.detail_transaction.findByPk(id, {
      include: [db.product, db.transaction]
    });
    if (detailTransaction) {
      res.status(200).json(detailTransaction);
    } else {
      res.status(404).json({ error: 'Detail Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDetailTransactions,
  getDetailTransactionById
};

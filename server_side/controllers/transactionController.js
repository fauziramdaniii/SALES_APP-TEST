const db = require('../models');

const createTransaction = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const { date, details } = req.body;

    // Buat transaksi baru
    const newTransaction = await db.transaction.create({ date }, { transaction });

    // Buat detail transaksi baru
    const detailTransactions = details.map(detail => ({
      id_transaction: newTransaction.id,
      id_product: detail.id_product,
      quantity: detail.quantity
    }));

    await db.detail_transaction.bulkCreate(detailTransactions, { transaction });

    // Commit transaction
    await transaction.commit();

    res.status(201).json(newTransaction);
  } catch (error) {
    // Rollback transaction
    await transaction.rollback();
    res.status(500).json({ error: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await db.transaction.findAll({
      include: [{ model: db.detail_transaction, include: [db.product] }]
    });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await db.transaction.findByPk(id, {
      include: [{ model: db.detail_transaction, include: [db.product] }]
    });
    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ error: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  getTransactionById
};
    
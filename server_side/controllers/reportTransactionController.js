const { sequelize } = require('../models');

const getTransactionsByProductType = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate query parameters are required' });
    }

    const results = await sequelize.query(`
      SELECT 
        product_types.name AS product_type_name,
        COUNT(transactions.id) AS total_transactions
      FROM 
        transactions
      JOIN 
        detail_transactions ON transactions.id = detail_transactions.id_transaction
      JOIN 
        products ON detail_transactions.id_product = products.id
      JOIN 
        product_types ON products.id_product_type = product_types.id
      WHERE 
        transactions.date BETWEEN :startDate AND :endDate
      GROUP BY 
        product_types.name;
    `, {
      replacements: { startDate, endDate },
      type: sequelize.QueryTypes.SELECT
    });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getTransactionsByProductType
};

const db = require('../models');

const createProductType = async (req, res) => {
  try {
    const { name } = req.body;
    const newProductType = await db.product_type.create({ name });
    res.status(201).json(newProductType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductTypes = async (req, res) => {
  try {
    const productTypes = await db.product_type.findAll();
    res.status(200).json(productTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const productType = await db.product_type.findByPk(id);
    if (productType) {
      res.status(200).json(productType);
    } else {
      res.status(404).json({ error: 'Jenis Barang not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProductType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const [updated] = await db.product_type.update({ name }, { where: { id } });
    if (updated) {
      const updatedProductType = await db.product_type.findByPk(id);
      res.status(200).json(updatedProductType);
    } else {
      res.status(404).json({ error: 'Jenis Barang not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProductType = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.product_type.destroy({ where: { id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Jenis Barang not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProductType,
  getProductTypes,
  getProductTypeById,
  updateProductType,
  deleteProductType,
};

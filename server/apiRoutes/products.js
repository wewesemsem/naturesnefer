const router = require('express').Router();
const { Product } = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:productId', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.productId);
    res.status(200).json(singleProduct);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

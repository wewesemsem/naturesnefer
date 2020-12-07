const router = require('express').Router();

router.use('/products', require('./products'));

router.use((req, res, next) => {
  const err = new Error('404 Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;

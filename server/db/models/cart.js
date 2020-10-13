const Sequelize = require('sequelize');
const db = require('../db');

const Cart = db.define('cart', {
  status: {
    type: Sequelize.ENUM('Opened', 'Closed'),
    allowNull: false,
    defaultValue: 'Opened',
  },
});

/**
 * classMethods
 */
Cart.findOpenCart = async function (userId) {
  const openCart = await Cart.findOne({
    where: { status: 'Opened', userId: userId },
  });
  return openCart;
};

Cart.findClosedCarts = async function (userId) {
  const closedCarts = await Cart.findAll({
    where: { status: 'Closed', userId: userId },
  });
  return closedCarts;
};

module.exports = Cart;

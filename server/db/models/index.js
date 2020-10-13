const User = require('./user');
const Product = require('./product');
const Cart = require('./cart');
const CartItem = require('./cartItem');

User.hasMany(Cart);
Cart.belongsTo(User);
Cart.hasMany(CartItem);
Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });

module.exports = {
  User,
  Product,
  Cart,
  CartItem,
};

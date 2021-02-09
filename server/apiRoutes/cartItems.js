const router = require('express').Router();
const { Cart, Product, CartItem } = require('../db/models');

//GET : all cart items in current cart
router.get('/', async (req, res, next) => {
  try {
    let cartItems;
    //GUEST CART
    if (!req.session.passport || !req.session.passport.user) {
      cartItems = req.session.guestCart;
    } else {
      //USER CART
      const userId = req.session.passport.user;
      let userCart = await Cart.findOpenCart(userId);
      if (!userCart) {
        res.status(401).send('Your shopping cart is empty.');
      }
      cartItems = await userCart.getProducts();
    }
    res.status(200).json(cartItems);
  } catch (err) {
    next(err);
  }
});

//POST : add cart item to cart
router.post('/', async (req, res, next) => {
  try {
    const productToAdd = req.body.product;
    const productId = productToAdd.id;

    //GUEST CART (Maybe redirect to post/guest)
    if (!req.session.passport || !req.session.passport.user) {
      let guestCart = req.session.guestCart;
      if (guestCart[productId]) {
        res.status(401).send('This item is already in your cart.');
      } else {
        let newCartItem = {
          name: productToAdd.name,
          quantity: 1,
          price: productToAdd.price,
          productId,
        };
        guestCart[productId] = newCartItem;
        res.status(201).json(newCartItem);
      }
    } else {
      //USER CART
      const userId = req.session.passport.user;
      let userCart = await Cart.findOpenCart(userId);
      let validated = true;

      if (!userCart) {
        userCart = await Cart.create({ userId });
      }

      const userCartItems = await userCart.getProducts();
      userCartItems.forEach((cartItem) => {
        if (cartItem.dataValues.name === productToAdd.name) {
          validated = false;
          res.status(401).send('This item is already in your cart.');
        }
      });

      if (validated) {
        const newCartItem = await CartItem.create({
          quantity: 1,
          price: productToAdd.price,
          productId,
          cartId: userCart.id,
        });

        res.status(201).json(newCartItem);
      }
    }
  } catch (err) {
    next(err);
  }
});

//PUT : update cart item in cart
router.get('/:productId', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.productId);
    res.status(200).json(singleProduct);
  } catch (err) {
    next(err);
  }
});

//DELETE : remove cart item from cart
router.get('/:productId', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.productId);
    res.status(200).json(singleProduct);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const router = require('express').Router();
const { Cart, Product, CartItem } = require('../db/models');

//GET : all cart items in open cart
router.get('/', async (req, res, next) => {
  try {
    let cartItems = [];
    //GUEST CART
    if (!req.session.passport || !req.session.passport.user) {
      cartItems = req.session.guestCart;
      res.status(200).json(cartItems);
    } else {
      //USER CART
      const userId = req.session.passport.user;
      const userCart = await Cart.findOpenCart(userId);
      if (userCart) cartItems = await userCart.getCartItems();
      res.status(200).json(cartItems);
    }
  } catch (err) {
    next(err);
  }
});

//GET : all cart items by cartId
router.get('/:cartId', async (req, res, next) => {
  try {
    const cartItems = await CartItem.findAll({
      Where: { cartId: req.params.cartId },
    });
    res.status(200).json(cartItems);
  } catch (err) {
    next(err);
  }
});

//POST : cart item to guest cart
router.post('/guest', async (req, res, next) => {
  try {
    const productToAdd = req.body.cartItem.product;
    const productId = productToAdd.id;
    const quantity = parseInt(req.body.cartItem.quantity);
    let updatedCartItem = null;

    let guestCart = req.session.guestCart;
    let newCartItem = false;

    guestCart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        updatedCartItem = cartItem;
      }
    });

    if (updatedCartItem) {
      updatedCartItem.quantity = parseInt(updatedCartItem.quantity) + quantity;
      if (updatedCartItem.quantity > process.env.MAX_QTY_PER_ITEM) {
        res.status(401).send('Quantity exceeds maximum amount.');
      } else {
        newCartItem = updatedCartItem;
      }
    }

    if (!newCartItem) {
      newCartItem = {
        name: productToAdd.name,
        quantity,
        price: productToAdd.price,
        productId,
      };
      guestCart.push(newCartItem);
    }
    res.status(201).json(newCartItem);
  } catch (err) {
    next(err);
  }
});

//POST : cart item to open user cart
router.post('/', async (req, res, next) => {
  try {
    if (!req.session.passport || !req.session.passport.user) {
      res.redirect(307, '/api/cartItems/guest');
    } else {
      const productToAdd = req.body.cartItem.product;
      const quantity = parseInt(req.body.cartItem.quantity);
      const productId = productToAdd.id;
      let validated = true;

      const userId = req.session.passport.user;
      let userCart = await Cart.findOpenCart(userId);

      if (!userCart) {
        userCart = await Cart.create({ userId });
      }

      const userCartItems = await userCart.getCartItems();
      userCartItems.forEach(async (cartItem) => {
        if (cartItem.dataValues.productId === productId) {
          validated = false;
          const updatedQuantity = cartItem.dataValues.quantity + quantity;
          if (updatedQuantity > process.env.MAX_QTY_PER_ITEM) {
            res.status(401).send('Quantity exceeds maximum amount.');
          } else {
            const updatedCartItem = await cartItem.update({
              quantity: updatedQuantity,
            });
            res.status(201).json(updatedCartItem);
          }
        }
      });

      if (validated) {
        const newCartItem = await CartItem.create({
          quantity,
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

//PUT : (update) cart item in open cart
router.put('/', async (req, res, next) => {
  try {
    const productToUpdate = req.body.cartItem;
    const updatedQuantity = parseInt(req.body.updatedQuantity);
    if (updatedQuantity > process.env.MAX_QTY_PER_ITEM) {
      res.status(401).send('Quantity exceeds maximum amount.');
    } else {
      let updatedCartItem;

      //GUEST CART
      if (!req.session.passport || !req.session.passport.user) {
        let guestCart = req.session.guestCart;
        guestCart.forEach((cartItem) => {
          if (cartItem.name === productToUpdate.name) {
            updatedCartItem = cartItem;
            updatedCartItem.quantity = updatedQuantity;
          }
        });
      } else {
        //USER CART
        let itemToUpdate = await CartItem.findOne({
          where: { id: productToUpdate.id },
        });
        await itemToUpdate.update({ quantity: updatedQuantity });
        updatedCartItem = itemToUpdate;
      }

      res.status(200).json(updatedCartItem);
    }
  } catch (err) {
    next(err);
  }
});

//DELETE : cart item from open cart
router.get('/:productId', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.productId);
    res.status(200).json(singleProduct);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

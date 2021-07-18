import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_OPEN_CART_ITEMS = 'GET_OPEN_CART_ITEMS';
const ADD_CART_ITEM = 'ADD_CART_ITEM';
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
const DELETE_CART_ITEM = 'DELETE_CART_ITEM';

/**
 * INITIAL STATE
 */
const cartItems = [];

/**
 * ACTION CREATORS
 */
const getOpenCartItems = (cartItems) => ({
  type: GET_OPEN_CART_ITEMS,
  cartItems,
});
const addCartItem = (cartItem) => ({ type: ADD_CART_ITEM, cartItem });
const updateCartItem = (updatedCartItem) => ({
  type: UPDATE_CART_ITEM,
  updatedCartItem,
});
const deleteCartItem = (cartItem) => ({
  type: DELETE_CART_ITEM,
  cartItem,
});

/**
 * THUNK CREATORS
 */
export const getOpenCartItemsThunk = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/cartItems/');
    dispatch(getOpenCartItems(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const addToCart = (cartItem) => async (dispatch) => {
  try {
    const res = await axios.post('/api/cartItems/', { cartItem });
    dispatch(addCartItem(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const updateCart = (cartItem, updatedQuantity) => async (dispatch) => {
  try {
    const res = await axios.put('/api/cartItems/', {
      cartItem,
      updatedQuantity,
    });
    dispatch(updateCartItem(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const deleteFromCart = (cartItem) => async (dispatch) => {
  try {
    if (!cartItem.id) cartItem.id = cartItem.productId;
    await axios.delete(`/api/cartItems/${cartItem.id}`);
    dispatch(deleteCartItem(cartItem));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = cartItems, action) {
  switch (action.type) {
    case GET_OPEN_CART_ITEMS:
      return action.cartItems;

    case ADD_CART_ITEM:
      let newState = [...state];
      let found = false;
      for (let i = 0; i < state.length; i++) {
        if (state[i].name === action.cartItem.name) {
          found = true;
          newState[i] = action.cartItem;
        }
      }
      if (!found) newState.push(action.cartItem);
      return newState;

    case UPDATE_CART_ITEM:
      let updatedState = [...state];
      for (let i = 0; i < state.length; i++) {
        if (state[i].name === action.updatedCartItem.name) {
          updatedState[i] = action.updatedCartItem;
        }
      }
      return updatedState;

    case DELETE_CART_ITEM:
      let deletedState = [...state];
      for (let i = 0; i < state.length; i++) {
        if (state[i].name === action.cartItem.name) {
          deletedState.splice(i, 1);
        }
      }
      return deletedState;
    default:
      return state;
  }
}

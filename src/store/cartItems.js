import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_CART_ITEMS = 'GET_CART_ITEMS';
const ADD_CART_ITEM = 'ADD_CART_ITEM';

/**
 * INITIAL STATE
 */
const cartItems = [];

/**
 * ACTION CREATORS
 */
const getCartItems = (cartItems) => ({ type: GET_CART_ITEMS, cartItems });
const addCartItem = (cartItem) => ({ type: ADD_CART_ITEM, cartItem });

/**
 * THUNK CREATORS
 */
export const getAllCartItems = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/cartItems/');
    dispatch(getCartItems(res.data || cartItems));
  } catch (err) {
    console.error(err);
  }
};

export const addToCart = (product) => async (dispatch) => {
  try {
    const res = await axios.post('/api/cartItems/', { product });
    dispatch(addCartItem(res.data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = cartItems, action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      return action.cartItems;
    case ADD_CART_ITEM:
      let newState = [...state];
      newState.push(action.cartItem);
      return newState;
    default:
      return state;
  }
}

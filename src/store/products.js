import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_PRODUCT = 'GET_PRODUCT';

/**
 * INITIAL STATE
 */
const productList = [];

/**
 * ACTION CREATORS
 */
const getProducts = (products) => ({ type: GET_PRODUCTS, products });
const getProduct = (product) => ({ type: GET_PRODUCT, product });

/**
 * THUNK CREATORS
 */
export const getAllProducts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/products/');
    dispatch(getProducts(res.data || productList));
  } catch (err) {
    console.error(err);
  }
};

export const getProductById = (productId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/products/${productId}`);
    dispatch(getProduct(res.data || productList));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = productList, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case GET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}

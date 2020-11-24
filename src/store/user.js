import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const ADD_ADDRESS = 'ADD_ADDRESS';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const addedAddress = (address) => ({ type: ADD_ADDRESS, address });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(getUser(res.data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (email, password, method, firstName, lastName) => async (
  dispatch
) => {
  let res;
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      firstName,
      lastName,
    });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    history.push('/');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.delete('/auth/logout');
    dispatch(removeUser());
    history.push('/login');
  } catch (err) {
    console.error(err);
  }
};

export const forgot = (email) => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/forgot-password', { email });
    dispatch(getUser({ error: null, alert: data }));
  } catch (wrongEmailError) {
    return dispatch(getUser({ error: wrongEmailError }));
  }
};

export const addAddress = (address) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/users', address);
    dispatch(addedAddress(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case ADD_ADDRESS:
      return action.address;
    default:
      return state;
  }
}

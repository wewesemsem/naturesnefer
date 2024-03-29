import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

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

export const reset = (password, token) => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/reset', { password, token });
    dispatch(getUser({ error: null, alert: data }));
  } catch (invalidTokenError) {
    return dispatch(getUser({ error: invalidTokenError }));
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
    default:
      return state;
  }
}

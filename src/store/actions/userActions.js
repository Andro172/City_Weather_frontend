import ApiService from '../../services/api.service';
import TokenService from '../../services/token.service';
import {
  LOGIN,
  LOGOUT,
} from './types';
import history from '../../router/history';
import io from '../../services/socket.service';

/**
 * Logout user
 */
export const logout = () => (dispatch) => {
  // Remove token from axios header and localstorage
  TokenService.removeToken();
  ApiService.removeHeader();
  // Remove user from store
  dispatch({
    type: LOGOUT,
  });
  // Disconnect socket
  io.disconnect();
  history.push('/');
};

/**
 * Login user
 * @param {object} form
 */
export const login = (form) => async (dispatch) => {
  try {
    const res = await ApiService.post('auth/login', { form });
    if (res.status === 200) {
      // Save token to localstorage and set axios header
      TokenService.saveToken(res.data.token);
      ApiService.setHeader();
      // Save user to store
      dispatch({
        type: LOGIN,
        payload: res.data.user,
      });
      // connect socket
      io.connect();
      // router push to home
      history.push('/');
    }
  } catch (err) {
    // Error handled in ApiService
  }
};

/**
 * Initialize user on refresh
 */
export const init = () => async (dispatch) => {
  try {
    const token = TokenService.getToken();
    // If token exists set header
    if (token) {
      ApiService.setHeader();
      const res = await ApiService.get('users/me');
      // Save user to store
      dispatch({
        type: LOGIN,
        payload: res.data,
      });
      // Connect socket
      io.connect();
    }
  } catch (err) {
    TokenService.removeToken();
    ApiService.removeHeader();
    dispatch({
      type: LOGOUT,
    });
  }
};

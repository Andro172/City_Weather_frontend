
import { DISPLAY_NOTIFICATION, HIDE_NOTIFICATION } from './types';

let timeout;

/**
 * Display notification
 * @param {object} data
 */
export const showNotification = (data) => (dispatch) => {
  // Reset timeout
  if (timeout) {
    clearTimeout(timeout);
  }

  dispatch({
    type: DISPLAY_NOTIFICATION,
    payload: data,
  });

  timeout = setTimeout(() => {
    dispatch({
      type: HIDE_NOTIFICATION,
    });
    timeout = null;
  }, 5000);
};

/**
 * Hide notification
 */
export const hideNotification = () => (dispatch) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  dispatch({
    type: HIDE_NOTIFICATION,
  });
};

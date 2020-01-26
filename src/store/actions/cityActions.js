/* eslint-disable no-underscore-dangle */
import ApiService from '../../services/api.service';
import {
  GET_MY_CITIES,
  REMOVE_MY_CITIES,
  SET_LOADING,
} from './types';

/**
 * Get city information
 */
export const getMyCities = () => async (dispatch) => {
  try {
    // Set loading
    dispatch({
      type: SET_LOADING,
      payload: true,
    });
    const res = await ApiService.get('cities/my');
    if (res.status === 200) {
      dispatch({
        type: GET_MY_CITIES,
        payload: res.data.cities,
      });
    }
  } catch (err) {
    // Unset loading
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  }
};

/**
 * Remove city information from store
 */
export const removeMyCities = () => (dispatch) => {
  dispatch({
    type: REMOVE_MY_CITIES,
  });
};

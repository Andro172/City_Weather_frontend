/* eslint-disable class-methods-use-this */
import axios from 'axios';
import TokenService from './token.service';
import store from '../store/store';
import { showNotification } from '../store/actions/notificationActions';
import { LOGOUT } from '../store/actions/types';

const errorCallback = async (error) => {
  if (error.request.status === 401 && (
    error.response.data.error === 'no_token'
    || error.response.data.error === 'invalid_token')
  ) {
    TokenService.removeToken();
    axios.defaults.headers.common = {};
    await store.dispatch({
      type: LOGOUT,
    });
  } else if (error.request.status === 500) {
    await store.dispatch(showNotification({
      type: 'error',
      text: 'Something went wrong!',
      title: 'Error',
    }));
  } else {
    await store.dispatch(showNotification({
      type: 'error',
      text: error.response.data.error,
      title: 'Error',
    }));
  }
  throw error;
};

class ApiService {
  init(baseURL) {
    axios.defaults.baseURL = baseURL;

    axios.interceptors.response.use(
      (response) => response,
      errorCallback,
    );
  }

  setHeader() {
    axios.defaults.headers.common.Authorization = `Bearer ${TokenService.getToken()}`;
  }

  removeHeader() {
    axios.defaults.headers.common = {};
  }

  get(resource, options) {
    return axios.get(resource, options);
  }

  post(resource, data, options) {
    return axios.post(resource, data, options);
  }

  put(resource, data, options) {
    return axios.put(resource, data, options);
  }

  delete(resource, options) {
    return axios.delete(resource, options);
  }
}

export default new ApiService();

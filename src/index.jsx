import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import Store from './store/store';
import * as serviceWorker from './serviceWorker';
import ApiService from './services/api.service';

// Custom css
import './assets/scss/index.scss';

// Initialize api service
ApiService.init(process.env.REACT_APP_ROOT);

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

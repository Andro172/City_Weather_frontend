import { combineReducers } from 'redux';
import userReducer from './userReducer';
import notificationReducer from './notificationReducer';
import cityReducer from './cityReducer';

export default combineReducers({
  user: userReducer,
  notifications: notificationReducer,
  city: cityReducer,
});

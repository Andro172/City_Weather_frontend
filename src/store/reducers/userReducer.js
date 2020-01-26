import {
  LOGIN,
  LOGOUT,
} from '../actions/types';

const initialState = {
  loggedIn: false,
  username: '',
  online: false,
  roles: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        username: action.payload.username,
        roles: action.payload.roles,
        online: true,
        loggedIn: true,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

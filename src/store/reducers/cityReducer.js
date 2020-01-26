import {
  GET_MY_CITIES,
  REMOVE_MY_CITIES,
  SET_LOADING,
} from '../actions/types';

const initialState = {
  loading: false,
  cities: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MY_CITIES:
      return {
        cities: action.payload,
        loading: false,
      };
    case REMOVE_MY_CITIES:
      return {
        ...initialState,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

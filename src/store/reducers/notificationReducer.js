import { DISPLAY_NOTIFICATION, HIDE_NOTIFICATION } from '../actions/types';

const initialState = {
  show: false,
  text: '',
  title: '',
  type: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DISPLAY_NOTIFICATION:
      return {
        ...state,
        show: true,
        text: action.payload.text,
        title: action.payload.title,
        type: action.payload.type,
      };
    case HIDE_NOTIFICATION:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

import {
  SET_APPLICATION_ERROR,
  CLEAR_APPLICATION_ERROR,
} from '../actions/types';

// A reducer to populate an apiError property
export default function apiErrorReducer(state = null, action) {
  switch (action.type) {
    case SET_APPLICATION_ERROR:
      return action.payload;

    case CLEAR_APPLICATION_ERROR:
      return null;

    default:
      return state;
  }
}

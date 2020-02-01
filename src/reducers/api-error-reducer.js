import {
  API_ERROR,
  CLEAR_API_ERROR,
} from '../actions/types';

// A reducer to populate an apiError property
export default function apiErrorReducer(state = null, action) {
  switch (action.type) {
    case API_ERROR:
      return action.payload;

    case CLEAR_API_ERROR:
      return null;

    default:
      return state;
  }
}

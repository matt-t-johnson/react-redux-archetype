import {
  API_SUCCESS,
} from '../actions/types';

// A reducer to populate an apiResult property. This is the
// reducer likely to be overriden to allow for a bespoke property
// tied to a specific API endpoint.
export default function apiResultReducer(state = null, action) {
  switch (action.type) {
    case API_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}

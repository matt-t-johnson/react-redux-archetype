import {
  API_START,
  API_END,
  API_INFLIGHT_START,
  API_INFLIGHT_END,
} from '../actions/types';

let refcount = 0;

// A reducer to populate a loading property. A refcounting scheme
// is used here to allow for multi-fetch requests from a single
// component
export default function apiLoadingReducer(state, action) {
  switch (action.type) {
    case API_START:
      refcount += 1;
      break;

    case API_END:
      refcount -= 1;
      break;

    default:
      break;
  }

  // true if nonzero
  return Boolean(refcount);
}


let postloadRefcount = 0;

// A reducer to populate a second loading property. A refcounting scheme
// is used here to allow for multi-fetch requests from a single
// component
export function inflightActionsReducer(state, action) {
  switch (action.type) {
    case API_INFLIGHT_START:
      postloadRefcount += 1;
      break;

    case API_INFLIGHT_END:
      postloadRefcount -= 1;
      break;

    default:
      break;
  }

  // true if nonzero
  return Boolean(postloadRefcount);
}

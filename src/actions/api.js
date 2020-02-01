import {
  API,
  API_INFLIGHT_START,
  API_INFLIGHT_END,
  API_START,
  API_END,
  ACCESS_DENIED,
  API_SUCCESS,
  API_ERROR,
  CLEAR_API_ERROR,
} from './types';

/*
 * Signals the start of an async api request. A refcounted
 * loading flag will be updated
 */
export const apiStart = () => ({
  type: API_START,
});

/*
 * Signals the end of an async api request. A refcounted
 * loading flag will be updated
 */
export const apiEnd = () => ({
  type: API_END,
});

/*
 * Signals the start of an async api request that happens after
 * initial page load. Affects a separate action-loading prop, allowing
 * the page to show a separate spinner when loading vs. completing a post-load
 * action.
 */
export const apiInflightStart = () => ({
  type: API_INFLIGHT_START,
});

/*
 * Signals the end of a post-load async api request. Affects a
 * separate action-loading prop.
 */
export const apiInflightEnd = () => ({
  type: API_INFLIGHT_END,
});

/*
 * Action to signal a 403 error
 */
export const accessDenied = url => ({
  type: ACCESS_DENIED,
  payload: url,
});

/*
 * Action to signal successful API response. Typically,
 * an endpoint-specific success action will be substituted.
 */
export const apiSuccess = result => ({
  type: API_SUCCESS,
  payload: result,
});

/*
 * Action to signal error response.
 */
export const apiError = response => ({
  type: API_ERROR,
  payload: response,
});

/*
 * Action to clear an error response from the store.
 */
export const clearApiError = response => ({
  type: CLEAR_API_ERROR,
  payload: response,
});

/* Implements a wrapper function that simplifies calling the fetch
 * middleware. The arguments are defaulted such that most can be
 * omitted.
 *
 * @param {Object} details - properties specifying the request details.
 * Only the url property is required, the rest are assigned default values.
 * @param  {String} details.url - path to fetch. You can omit host and the
 * config host will be prepended.
 * @param  {String} details.method - http method *GET, POST, DELETE, etc.
 * @param  {Object} details.data - data params to send with request. For now
 * just handles a single-level hierarchy for query params. A request body
 * can have any nesting.
 * @param  {Function} details.onSuccess - a success action handler. Default handler
 * attaches the API response to an apiResult property.
 * @param  {Function} details.onFailure - an error action handler. Default handler attaches
 * the API response to an apiError property.
 * @param  {Object} details.headers - optional headers
 * @param  {String} details.contentType - default is application/json
 * @param  {Object} details.mockFixture - an optional test fixture to substitute when the
 * mock middleware is active instead of the api middleware
 *
 * @returns the action to feed to the fetch middleware.
 */
export function apiAction({
  url,
  method = 'GET',
  data = undefined,
  onStart = apiStart,
  onFinish = apiEnd,
  onSuccess = apiSuccess,
  onFailure = apiError,
  headers = undefined,
  contentType = undefined,
  mockFixture = undefined,
}) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      onSuccess,
      onFailure,
      onStart,
      onFinish,
      headers,
      contentType,
      mockFixture,
    },
  };
}

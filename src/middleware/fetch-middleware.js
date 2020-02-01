// Pattern copied from https://blog.logrocket.com/data-fetching-in-redux-apps-a-100-correct-approach-4d26e21750fc/
// which in turn was inspired by https://leanpub.com/redux-book

import fetch, { mockFetch } from '../fetch';
import { API } from '../actions/types';
import {
  accessDenied,
} from '../actions/api';

/*
 * Given an URL and simple one-level query params object, generates a
 * properly encoded set of query params.
 *
 * @param String | url - the URL to enhance with query params
 * @param Object | queryParamsObj - the object whose keys will be transformed
 * into query params
 *
 * @returns String | the URL with query params
 */
export function updateUrlWithQueryParams(url, queryParamsObj = {}) {
  const urlWithSearchParams = new URL(url);
  const searchParams = new URLSearchParams();
  Object.keys(queryParamsObj).forEach(key => {
    searchParams.append(key, queryParamsObj[key]);
  });

  urlWithSearchParams.search = searchParams.toString();
  return urlWithSearchParams.toString();
}

/* This is a Redux middleware. When attached to the store via
 * applyMiddleware, it can intercept action methods and perform
 * a related process, and then pass the action through to allow
 * other middlewares to process.
 *
 * This middleware provides a API action
 * type and handles most of the ugliness associated with async
 * API fetches:
 *
 * - Forming a proper URL including the standard API host
 * - Normalizing parameter-sending among GET/DELETE (query params)
 *   and POST/PUT (body)
 * - Standardizing processing of key steps in an async flow:
 *   starting, receiving result or error, and ending
 * - Some messy but necessary normalization of error shapes, so
 *   that a caller can always get a status code and reasonable
 *   message in case of an API error.
 */
const fetchMiddleware = fetchTransport => ({ dispatch }) => next => action => {
  // standard pattern: pass action through to allow others
  // to handle it as well
  next(action);

  if (action.type !== API) return null;

  const {
    method,
    onSuccess,
    onFailure,
    onStart,
    onFinish,
    headers,
    contentType,
    mockFixture,
  } = action.payload;

  let {
    url,
    data,
  } = action.payload;

  // assumes config.apiHost unless domain specified
  if (!/^http/.test(url)) {
    url = `${url}`;
  }

  // for a GET or DELETE method request, we'll convert data
  // into query params and add them to the url
  if (/get|delete/i.test(method)) {
    if (data) {
      url = updateUrlWithQueryParams(url, data);
      data = undefined;
    }
  }

  // Signal start (trigger loading refcount++ and action)
  dispatch(onStart());

  // Most of our calls are JSON outbound and inbound
  // With a non-JSON contentType we won't encode/decode
  const expectJson = contentType === 'application/json';

  return fetchTransport(url, {
    method,
    headers,
    body: expectJson ? data && JSON.stringify(data) : data,
  }, mockFixture)

    // cascade to extract json or just resolve promise with raw result
    .then(result => (expectJson ? result.json() : result))

    // this only gets called on successful retrieval. the imported fetch
    // function throws an error if !result.ok
    .then(result => dispatch(onSuccess(result)))

    // handles both types of exceptions: fetch-thrown exceptions due to
    // e.g. lack of network connectivity, or app-thrown exceptions such
    // as a 4xx API response
    .catch(err => {
      // first case here is a fetch-thrown exception. no response object
      // attached as there was likely no response available
      if (!err.response) {
        return dispatch(onFailure(err));
      }

      // first look at 403s
      const { status } = err.response;
      if (status === 403) {
        return dispatch(accessDenied(window.location.pathname));
      }

      // normalized error objects
      const error = {
        status,
        message: `API reported status ${status}`,
      };

      try {
        error.body = JSON.parse(err.body);
      } catch (e) {
        error.body = err.body;
      }

      return dispatch(onFailure(error));
    })

    // Signal end (trigger loading refcount-- and action)
    .finally(() => dispatch(onFinish()));
};

export default fetchMiddleware(fetch);
export const mockMiddleware = fetchMiddleware(mockFetch);

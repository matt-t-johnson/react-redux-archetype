import { updateUrlWithQueryParams, mockMiddleware } from './fetch-middleware';
import configureStore from '../store';
import { API } from '../actions/types';
import {
  apiStart,
  apiEnd,
  apiSuccess,
  apiError,
} from '../actions/api';

const mockFetchStore = configureStore(mockMiddleware);

describe('updateUrlWithQueryParams', () => {
  const url = 'http://app.com/api/winning';
  const regQueryParams = /.*\?(.*)/;

  it('appends no query params with an empty object', () => {
    const result = updateUrlWithQueryParams(url, {});
    expect(result).toEqual(url);
  });

  it('handles basic params with numeric values', () => {
    const result = updateUrlWithQueryParams(url, { month: 1, year: 2019 });
    const match = regQueryParams.exec(result);
    const [monthP, yearP] = match[1].split('&');
    expect(monthP).toEqual('month=1');
    expect(yearP).toEqual('year=2019');
  });

  it('handles params with spaces in values', () => {
    const result = updateUrlWithQueryParams(url, { withSpaces: 'nice kitty!' });
    const match = regQueryParams.exec(result);
    const [withSpacesP] = match[1].split('&');
    expect(withSpacesP).toEqual('withSpaces=nice+kitty%21');
  });

  it('url-encodes params with ampersands in values', () => {
    const result = updateUrlWithQueryParams(url, { withConfusingStuff: 'dang&nabbit' });
    const match = regQueryParams.exec(result);
    const [withSpacesP] = match[1].split('&');
    expect(withSpacesP).toEqual('withConfusingStuff=dang%26nabbit');
  });
});


describe('fetchMiddleware', () => {
  it('handles API actions', done => {
    // Increase timeout to test async fetching
    jest.setTimeout(30000);
    const mockFixture = {
      foo: 'bar',
      fizz: 'buzz',
    };

    // Mock apiHost
    window.appConfig = { apiHost: 'http://localhost:8080' };

    mockFetchStore.dispatch({
      type: API,
      payload: {
        url: '/mock',
        method: 'GET',
        onStart: apiStart,
        onFinish: apiEnd,
        onSuccess: apiSuccess,
        onFailure: apiError,
        contentType: 'application/json',
        mockFixture,
      },
    });

    const delayInMilliseconds = 1000;
    setTimeout(() => {
      const state = mockFetchStore.getState();
      expect(state.apiResult).toEqual(mockFixture);
      // Tell jest to wait until done() is invoked before finishing test
      done();
    }, delayInMilliseconds);
  });
});

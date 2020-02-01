import { addDefaultOptions } from './fetch';

describe('fetch wrapper', () => {
  it('adds default options', () => {
    const initOptions = {
      method: 'GET',
    };
    const expectedOptions = { credentials: 'same-origin', method: 'GET' };
    const modifiedOptions = addDefaultOptions(initOptions);
    expect(modifiedOptions).toEqual(expectedOptions);
  });
});

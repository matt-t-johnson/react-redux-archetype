import fetch from 'isomorphic-fetch';

export const addDefaultOptions = options => {
  const defaultOptions = {
    credentials: 'same-origin',
  };

  // Incoming options will overwrite defaultOptions
  const modifiedOptions = { ...defaultOptions, ...options };

  return modifiedOptions;
};

export default async (url, options = {}) => {
  const modifiedOptions = addDefaultOptions(options);
  const request = fetch(url, modifiedOptions);
  const response = await request;

  if (!response.ok) {
    const error = new Error('Fetch failed');
    error.response = response;
    error.body = await response.text();
    throw error;
  }

  return response;
};

/* A fake fetch transport. The third argument is a fixture, which can be
 * a static object or a function. If a function, the function will be called
 * synchronously to get the fixture (generally a binary)
 * @param {String} url | Url to fetch; ignored
 * @param {Object} options | Options object; ignored
 * @param {variant} mockFixture | Static object, or a function to get a binary
 * @returns Promise that resolves with a fetch-like Result
 */
export async function mockFetch(url, options = {}, mockFixture) {
  console.log('MOCK FETCH', options.method || 'GET', url, options);
  return new Promise(resolve => {
    setTimeout(() => {
      let result;
      let contentType;
      let filename;
      let contentLength;

      if (typeof mockFixture === 'function') {
        result = mockFixture();
        contentType = 'application/pdf';
        filename = 'tiny.pdf';
        contentLength = result.length;
      } else {
        result = mockFixture;
        contentType = 'application/json';
      }

      resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(result),
        body: () => Promise.resolve(result),
        blob: () => Promise.resolve(new Blob([result])),
        headers: new Headers({
          'content-type': contentType,
          'x-filename': filename,
          'content-length': contentLength,
        }),
      });
    }, 300);
  });
}

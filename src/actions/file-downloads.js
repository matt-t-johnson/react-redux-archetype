import {
  FILE_DOWNLOAD,
  FILE_DOWNLOAD_PROCESSED,
  FILE_DOWNLOAD_START,
  FILE_DOWNLOAD_END,
} from './types';

/* A corollary to apiStart
 * Allows file downloads to be pulled out of the loading
 * cycle
 */
export function startedFileDownload(ref) {
  return {
    type: FILE_DOWNLOAD_START,
    payload: {
      ref,
    },
  };
}

/* When a file download completes, and the result can be placed in the
 * store with additional info
 */
export function receivedFileDownload(result, ref) {
  return {
    type: FILE_DOWNLOAD,
    payload: {
      result,
      ref,
      filename: result.headers.get('x-filename'),
      contentType: result.headers.get('content-type'),
      contentLength: result.headers.get('content-length'),
    },
  };
}

/* when the download network request finishes
 * corollary to apiEnd
 */
export function endedFileDownload() {
  return {
    type: FILE_DOWNLOAD_END,
  };
}

/* When a download has been unpacked by the blob middleware
 */
export function processedFileDownload(payload) {
  return {
    type: FILE_DOWNLOAD_PROCESSED,
    payload,
  };
}

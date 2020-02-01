import {
  FILE_DOWNLOAD,
} from '../actions/types';

import {
  processedFileDownload,
} from '../actions/file-downloads';

/* This is a Redux middleware that takes a response with a blob
 * body, converts the blob to a object URL, and dispatches the
 * readied download via the processedFileDownload action.
 */
export default ({ dispatch }) => next => action => {
  // standard pattern: pass action through to allow others
  // to handle it as well
  next(action);

  if (action.type !== FILE_DOWNLOAD) return null;

  const {
    result,
    contentType,
  } = action.payload;

  return result
    .blob()
    .then(data => {
      const blob = new Blob([data], {
        type: contentType,
      });
      const objectUrl = URL.createObjectURL(data);
      const fileDownloadCompleted = { ...action.payload, objectUrl, blob };

      return dispatch(processedFileDownload(fileDownloadCompleted));
    });
};

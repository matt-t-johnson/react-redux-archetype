// A reducer to handle the file download
import {
  FILE_DOWNLOAD,
  FILE_DOWNLOAD_PROCESSED,
  FILE_DOWNLOAD_START,
  FILE_DOWNLOAD_END,
} from '../actions/types';

export function fileDownloadReducer(state = [], action) {
  switch (action.type) {
    case FILE_DOWNLOAD: {
      const currentRef = action.payload.ref;
      return state
        .filter(payload => currentRef !== payload.ref)
        .concat([action.payload]);
    }

    case FILE_DOWNLOAD_END:
    default:
      return state;
  }
}

export function completedFileDownloadReducer(state = [], action) {
  switch (action.type) {
    // makes sure the completed store loses the in-flight result
    // if it being re-downloaded
    case FILE_DOWNLOAD_START: {
      const currentRef = action.payload.ref;
      return state
        .filter(payload => currentRef !== payload.ref);
    }

    case FILE_DOWNLOAD_PROCESSED: {
      const currentRef = action.payload.ref;
      return state
        .filter(payload => currentRef !== payload.ref)
        .concat([action.payload]);
    }

    case FILE_DOWNLOAD_END:
    default:
      return state;
  }
}

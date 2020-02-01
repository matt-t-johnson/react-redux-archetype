import { combineReducers } from 'redux';
import apiErrorReducer from './api-error-reducer';
import apiLoadingReducer, { inflightActionsReducer } from './api-loading-reducer';
import apiResultReducer from './api-result-reducer';
import applicationErrorReducer from './application-error-reducer';
import {
  fileDownloadReducer,
  completedFileDownloadReducer,
} from './file-download-reducer';

export default combineReducers({
  apiError: apiErrorReducer,
  apiResult: apiResultReducer,
  applicationError: applicationErrorReducer,
  inFlightDownloads: fileDownloadReducer,
  downloads: completedFileDownloadReducer,
  loading: apiLoadingReducer,
  inflightActions: inflightActionsReducer,
});

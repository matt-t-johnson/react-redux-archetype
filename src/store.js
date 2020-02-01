import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './reducers/root-reducer';
import apiMiddleware from './middleware/fetch-middleware';
import blobMiddleware from './middleware/blob-middleware';

export default function configureStore(asyncMiddleware = apiMiddleware) {
  const composeEnhancers = composeWithDevTools({ realtime: true, port: 8080, trace: true });
  return createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(
        asyncMiddleware,
        blobMiddleware,
      ),
    ),
  );
}

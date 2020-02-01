import {
  startedFileDownload,
  processedFileDownload,
} from '../actions/file-downloads';
import {
  completedFileDownloadReducer,
} from './file-download-reducer';

describe('File download reducer module', () => {
  describe('completedFileDownloadReducer', () => {
    it('does not alter state for unknown actions', () => {
      const oldState = [];
      const newState = completedFileDownloadReducer(oldState, { type: 'BOOYAH' });
      expect(oldState).toBe(newState);
    });

    it('clears ref on download start', () => {
      const ref = 'boo-yah';
      const oldState = [processedFileDownload({ ref })];
      expect(oldState).toHaveLength(1);
      const newState = completedFileDownloadReducer(oldState, startedFileDownload(ref));
      expect(oldState).not.toBe(newState);
      expect(newState).toHaveLength(1);
    });
  });
});

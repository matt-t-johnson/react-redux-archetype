import React, { Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';

/* Implements a file control that accepts dragged files
 * and also allows dialog-based native browsing via the file
 * input. Triggers an upload action with the list of attached
 * files. Shows a loading spinner in place of the input.
 * @property {Function} upload | the callback which is called with
 * a list of attached files
 * @property {Boolean} loading | whether to show the loading spinner
 */
export default function FileUpload(props) {
  const [
    dragRefCount,
    setDragRefCount,
  ] = useState(0);

  const {
    upload,
    loading,
  } = props;

  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const browseFile = event => {
    event.preventDefault();

    fileInputRef.current.click();
  };

  function onChangeFileInput() {
    const { files } = fileInputRef.current;
    if (files.length) {
      upload(Array.from(files));
      formRef.current.reset();
    }
  }

  const dragEvents = {
    onDragEnter(event) {
      event.preventDefault();
      setDragRefCount(dragRefCount + 1);
    },
    onDragLeave() {
      setDragRefCount(dragRefCount - 1);
    },
    onDragOver(event) {
      event.preventDefault();
    },
    onDrop(event) {
      setDragRefCount(0);
      event.preventDefault();
      event.stopPropagation();

      // attach
      fileInputRef.current.files = event.dataTransfer.files;

      // force change trigger
      onChangeFileInput();
    },
  };

  const borderStyle = dragRefCount > 0 ? 'light-border' : '';

  return (
    <form
      className={`drag-drop ${borderStyle}`}
      data-ref='file-upload'
      {...dragEvents}
      ref={formRef}
    >
      {loading
        ? <Fragment>
            <p className='margin-top-lg'>
              This may take a few minutes
            </p>
            {/*TODO: add loading icon */}
            <button
              className='tertiary margin-bottom-lg margin-top-md'
              onClick={browseFile}
            >
            </button>
          </Fragment>
        : <Fragment>
            <p className="watermark">
              Drag & drop
            </p>
            <input
              type='file'
              onDrop={dragEvents.onDrop}
              onChange={onChangeFileInput}
              ref={fileInputRef}
              className='hidden'
              multiple
            />
            <button
              onDrop={dragEvents.onDrop}
              className='primary margin-bottom-lg'
              onClick={browseFile}
            >
              Browse instead
            </button>
          </Fragment>
      }
    </form>
  );
}

FileUpload.propTypes = {
  upload: PropTypes.func.isRequired, //The container callback method that dispatchs an upload action
  loading: PropTypes.bool,
};

import React from 'react';
import { mount } from 'enzyme';

// Components
import FileUpload from './file-upload';
import ReduxTestContext from '../../test/test-context-wrapper';

let props;
const uploadMethod = jest.fn();

describe('FileUpload component', () => {
  beforeEach(() => {
    props = {
      upload: uploadMethod,
      loading: false,
    };
  });

  function mountPage(customProps) {
    return mount(
      <ReduxTestContext>
        <FileUpload
          {...props}
          {...customProps}
        />
      </ReduxTestContext>,
    );
  }

  it('displays a loader when the loading property is true', () => {
    const wrapper = mountPage({ loading: true });
    const loader = wrapper.find('[data-ref="file-upload-loader"]');
    expect(loader.exists()).toBe(true);
  });

  it('does not display a loader when the loading property is false', () => {
    const wrapper = mountPage();
    const loader = wrapper.find('[data-ref="file-upload-loader"]');
    expect(loader.exists()).toBe(false);
  });
});

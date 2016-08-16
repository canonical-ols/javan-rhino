import React from 'react';
import expect from 'expect';
import {createRenderer} from 'react-addons-test-utils';
import Html from '../../src/helpers/html.js';

describe('html component', () => {

  it('should be an html block', () => {
    const renderer = createRenderer();
    const html = renderer.render(<Html />);

    expect(html.type).toEqual('html');
  });
});

import React from 'react';
import expect from 'expect';
import { createRenderer } from 'react-addons-test-utils';
import About from '../../src/containers/about.js';

describe('About container', () => {

  it('should render a div', () => {
    const renderer = createRenderer();
    const el = renderer.render(<About />);

    expect(el.type).toEqual('div');
  });

});

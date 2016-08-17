import React from 'react';
import expect from 'expect';
import { createRenderer } from 'react-addons-test-utils';
import Home from '../../src/containers/home.js';

describe('Home container', () => {

  it('should render a div', () => {
    const renderer = createRenderer();
    const el = renderer.render(<Home />);

    expect(el.type).toEqual('div');
  });
});

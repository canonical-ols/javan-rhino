import React from 'react';
import expect from 'expect';
import { createRenderer } from 'react-addons-test-utils';
import App from '../../src/containers/app.js';

describe('App container', () => {

  it('should render a div', () => {
    const renderer = createRenderer();
    const el = renderer.render(<App />);

    expect(el.type).toEqual('div');
  });

});

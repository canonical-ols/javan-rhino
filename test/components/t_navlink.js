import React from 'react';
import expect from 'expect';
import { createRenderer } from 'react-addons-test-utils';
import NavLink from '../../src/components/navlink.js';

describe('NavLink', () => {

  it('should render a react-router Link', () => {
    const renderer = createRenderer();
    const el = renderer.render(<NavLink />);

    expect(el.type.displayName).toEqual('Link');
  });

});

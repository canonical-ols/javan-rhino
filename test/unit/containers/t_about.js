import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import About from '../../../src/containers/about.js';

describe('<About /> container', () => {

  it('should render a div', () => {
    const el = shallow(<About />);

    expect(el.type()).toEqual('div');
  });

});

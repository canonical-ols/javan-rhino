import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Home from '../../../src/containers/home.js';

describe('<Home /> container', () => {

  it('should render a div', () => {
    const el = shallow(<Home />);

    expect(el.type()).toEqual('div');
  });
});

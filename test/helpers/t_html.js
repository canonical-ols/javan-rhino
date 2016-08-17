import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Html from '../../src/helpers/html.js';

describe('<Html /> helper', () => {

  it('should be an html block', () => {
    const html = shallow(<Html />);

    expect(html.type()).toEqual('html');
  });
});

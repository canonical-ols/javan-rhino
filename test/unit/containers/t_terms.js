import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Terms from '../../../src/containers/terms.js';

describe('<Terms /> container', () => {

  it('should render a div', () => {
    const el = shallow(<Terms />);

    expect(el.type()).toEqual('div');
  });

});

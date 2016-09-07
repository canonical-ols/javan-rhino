import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Footer from '../../../src/components/footer';

describe('<Footer /> component', () => {

  it('should render a div', () => {
    const el = shallow(<Footer />);

    expect(el.type()).toEqual('div');
  });

});

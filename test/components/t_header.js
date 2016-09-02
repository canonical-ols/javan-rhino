import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Header from '../../src/components/header';
import NavLink from '../../src/components/navlink';

describe('<Header /> component', () => {

  it('should render two links', () => {
    const el = shallow(<Header />);

    expect(el.find(NavLink).length).toEqual(2);
  });

});

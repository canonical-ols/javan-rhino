import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Header from '../../../src/components/header';
import NavLink from '../../../src/components/navlink';
import User from '../../../src/components/user';

describe('<Header /> component', () => {
  let header;

  beforeEach(() => {
    header = shallow(<Header />);
  });

  it('should render links', () => {
    expect(header.find(NavLink).length).toBeGreaterThan(0);
  });

  it('should render user component', () => {
    expect(header.find(User).length).toBeGreaterThan(0);
  });

});

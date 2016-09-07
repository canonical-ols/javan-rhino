import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { Link } from 'react-router';

import NavLink from '../../../src/components/navlink';

describe('<NavLink /> component', () => {

  it('should render a react-router Link', () => {
    const el = shallow(<NavLink />);

    expect(el.find(Link).length).toEqual(1);
  });

});

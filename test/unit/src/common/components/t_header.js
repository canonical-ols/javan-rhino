import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Header from '../../../../../src/common/components/header';
import SignIn from '../../../../../src/common/components/sign-in';

describe('<Header /> component', () => {
  let header;

  beforeEach(() => {
    header = shallow(<Header />);
  });

  it('should render user component', () => {
    expect(header.find(SignIn).length).toBeGreaterThan(0);
  });

});

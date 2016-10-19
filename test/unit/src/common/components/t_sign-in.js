import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import SignIn from '../../../../../src/common/components/sign-in';

describe('<SignIn /> component', () => {
  let wrapper;

  context('when logged out', () => {
    let props;

    beforeEach(() => {
      props = {
        identity: {
          isAuthenticated: false,
          isDev: false,
          name: ''
        }
      };

      wrapper = shallow(<SignIn {...props} />);
    });

    it('should render login link', () => {
      expect(wrapper.find('a[href="/login/authenticate"]').length).toBe(1);
    });

  });

  context('when logged in', () => {
    let props;

    beforeEach(() => {
      props = {
        identity: {
          isAuthenticated: true,
          isDev: false,
          name: 'Foo'
        }
      };

      wrapper = shallow(<SignIn {...props} />);
    });

    it('should render login link', () => {
      expect(wrapper.text()).toEqual('Foo Logout');
    });

  });
});

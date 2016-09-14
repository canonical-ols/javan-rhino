import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import User from '../../../src/components/user';

describe('<User /> component', () => {
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

      wrapper = shallow(<User {...props} />);
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

      wrapper = shallow(<User {...props} />);
    });

    it('should render login link', () => {
      expect(wrapper.text()).toEqual('Foo Logout');
    });

  });
});

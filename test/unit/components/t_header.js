import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import Header from '../../../src/components/header';
import NavLink from '../../../src/components/navlink';

const eventMock = {
  preventDefault: expect.createSpy()
};

describe('<Header /> component', () => {
  let header;

  context('when logged out', () => {
    let props;

    beforeEach(() => {
      props = {
        loggedIn: false,
        onLoginClick: expect.createSpy()
      };

      header = shallow(<Header {...props} />);
    });

    it('should render links', () => {
      expect(header.find(NavLink).length).toBeGreaterThan(0);
    });

    it('should contain a login link', () => {
      expect(header.find('a[children="Login"]').length).toEqual(1);
    });

    context('and login link is clicked', () => {
      beforeEach(() => {
        header.instance().onLoginClick(eventMock);
      });

      it('should call onLoginClick callback', () => {
        expect(props.onLoginClick).toHaveBeenCalled();
      });
    });
  });

  context('when logged out', () => {
    let props;

    beforeEach(() => {
      props = {
        loggedIn: true,
        onLoginClick: expect.createSpy()
      };

      header = shallow(<Header {...props} />);
    });

    it('should contain a logout link', () => {
      expect(header.find('a[children="Logout"]').length).toEqual(1);
    });
  });
});

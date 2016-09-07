import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import App from '../../../src/containers/app.js';
const mockStore = configureStore();

describe('<App /> container', () => {
  const store = mockStore({
    auth: {
      loggedIn: true
    }
  });

  it('should have a Header', () => {
    const el = shallow(<App store={ store } />);
    expect(el.find('Header')).toExist();
  });

});

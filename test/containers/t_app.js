import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import App from '../../src/containers/app.js';

describe('<App /> container', () => {

  it('should render a div', () => {
    const el = shallow(<App />);

    expect(el.type()).toEqual('div');
  });

});

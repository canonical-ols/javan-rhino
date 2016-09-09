import React from 'react';
import expect from 'expect';
import { render, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
const mockStore = configureStore();

import Html from '../../../src/helpers/html.js';

describe('<Html /> helper', () => {
  let store;
  let assets;

  beforeEach(() => {
    store = mockStore();

    assets = {
      styles: {
        main: 'example.css'
      },
      javascript: {
        main: 'example.js'
      }
    };
  });

  it('should be an html block', () => {
    const html = shallow(<Html assets={ assets } store={ store } />);

    expect(html.type()).toEqual('html');
  });

  it('should render content given as prop', () => {
    const content = <span>test</span>;
    // because of dangerouslySetInnerHTML we need to do static render instead of shallow
    const html = render(<Html component={ content } store={ store } assets={ assets } />);

    expect(html.find('#content').children('span').length).toEqual(1);
    expect(html.find('#content').text()).toEqual('test');
  });

  it('should render stylesheet links in head', () => {
    const content = <span>test</span>;
    const html = shallow(<Html component={ content } store={ store } assets={ assets } />);

    expect(html.find('body link[rel="stylesheet"]').length).toEqual(0);
    expect(html.find('head link[rel="stylesheet"]').length).toEqual(1);
  });
});

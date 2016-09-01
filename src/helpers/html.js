import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../redux/';

export default class Html extends Component {
  render() {
    const { assets, component } = this.props;
    const head = Helmet.rewind();
    const attrs = head.htmlAttributes.toComponent();
    const store = createStore(reducers);
    const content = component ? this.renderComponent(component, store) : '';

    return (
      <html {...attrs}>
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          <link rel="stylesheet" href={ assets.styles.main } />
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }}/>
          <script src={ assets.javascript.main } charSet="UTF-8"/>
        </body>
      </html>
    );
  }

  renderComponent(component, store) {
    return ReactDOM.renderToString(
      <Provider store={store} key="provider">
        { component }
      </Provider>
    );
  }
}

Html.propTypes = {
  component: PropTypes.node,
  assets: React.PropTypes.shape({
    styles: React.PropTypes.shape({
      main: React.PropTypes.string.isRequired
    }),
    javascript: React.PropTypes.shape({
      main: React.PropTypes.string.isRequired
    })
  })
};

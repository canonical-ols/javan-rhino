import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';

const conf = require('../../server/configure.js');

const assetHost = (global.NODE_ENV === 'production') ? ''
  : conf.get('SERVER:WEBPACK_DEV_URL');

export default class Html extends Component {
  render() {
    const { store, component, config } = this.props;
    const head = Helmet.rewind();
    const attrs = head.htmlAttributes.toComponent();
    const preloadedState = store.getState();
    const content = component ? this.renderComponent(component, store) : '';

    return (
      <html {...attrs}>
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          <link rel="stylesheet" href={ `${assetHost}/static/style.css` } />
        </head>
        <body>
          {/* https://github.com/nfl/react-helmet/issues/149 */}
          <Helmet
            script={[
              { src: 'https://js.stripe.com/v2/' }
            ]}
          />
          <div id="content" dangerouslySetInnerHTML={{ __html: content }}/>
          <script
            dangerouslySetInnerHTML={{ __html: `window.__CONFIG__ = ${JSON.stringify(config)}` }}
          />
          <script
            dangerouslySetInnerHTML={{ __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}` }}
          />
          <script src={ `${assetHost}/static/bundle.js` } />
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
  config: PropTypes.object,
  component: PropTypes.node,
  store: PropTypes.object,
  assets: React.PropTypes.shape({
    styles: React.PropTypes.shape({
      main: React.PropTypes.string.isRequired
    }),
    javascript: React.PropTypes.shape({
      main: React.PropTypes.string.isRequired
    })
  })
};

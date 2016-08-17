import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import Helmet from 'react-helmet';

export default class Html extends Component {

  render() {

    const { component } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();
    const attrs = head.htmlAttributes.toComponent();

    return (
      <html {...attrs}>
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }}/>
          <script src="/static/bundle.js" />
        </body>
      </html>
    );
  }
}

Html.propTypes = {
  component: PropTypes.node,
  assets: PropTypes.object
};

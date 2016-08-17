import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

export default class Html extends Component {

  render() {

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
          <div id="content">
            { this.props.children }
          </div>
          <script src="/static/bundle.js" />
        </body>
      </html>
    );
  }
}

Html.propTypes = {
  children: PropTypes.node,
  assets: PropTypes.object
};

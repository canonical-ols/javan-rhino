import React, { Component, PropTypes } from 'react';

import style from './sign-in.css';

export default class SignIn extends Component {
  renderAuthenticatedLink(user) {
    let link;

    if (user.isAuthenticated) {
      link = <div className={ style.link }>
        { user.name &&
          <span className={ style.username }>{ user.name }</span>
        }
        { ' ' }
        <a href="/logout">Logout</a>
      </div>;
    } else {
      link = <a className={ style.link } href="/login/authenticate">Login</a>;
    }

    return link;
  }

  render() {
    const { identity } = this.props;

    return this.renderAuthenticatedLink(identity);
  }
}

SignIn.propTypes = {
  identity: PropTypes.object.isRequired
};

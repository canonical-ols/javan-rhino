import React, { Component, PropTypes } from 'react';

import styles from './sign-in-banner.css';

export default class SignInBanner extends Component {

  _renderAuthenticated(identity) {
    const { name, email } = identity;
    return (
      <div>
        <div>Welcome, { name }</div>
        <div>
        You are signed in with the email address { email }. <a href="">Manage your SSO account</a>
        </div>
      </div>
    );
  }

  _renderUnauthenticated() {
    return (
      <a href="" className={ styles.button }>Sign in through Ubuntu SSO</a>
    );
  }

  render() {
    const { identity } = this.props;

    return identity.isAuthenticated ? this._renderAuthenticated(identity)
    : this._renderUnauthenticated();
  }
}

SignInBanner.propTypes = {
  identity: PropTypes.object.isRequired
};

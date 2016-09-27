import React, { Component, PropTypes } from 'react';

import { Anchor } from '../button/';
import styles from './sign-in-banner.css';

export default class SignInBanner extends Component {

  _renderAuthenticated(identity) {
    const { name, email } = identity;
    return (
      <div className={ styles.box }>
        <h3>Welcome, { name }</h3>
        <div>
          You are signed in with the email address { email }. <a href="https://login.ubuntu.com/">Manage your SSO account</a>
        </div>
      </div>
    );
  }

  _renderUnauthenticated() {
    return (
      <Anchor style={{ display: 'block' }} href="/login/authenticate">Sign in through Ubuntu One</Anchor>
    );
  }

  render() {
    const { identity } = this.props;

    return (
      <div className={ styles.banner }>
        { identity.isAuthenticated
          ? this._renderAuthenticated(identity)
          : this._renderUnauthenticated() }
      </div>
    );
  }
}

SignInBanner.propTypes = {
  identity: PropTypes.object.isRequired
};

import React, { Component, PropTypes } from 'react';

import { Anchor } from '../button/';
import styles from './sign-in-banner.css';
import tick from '../../style/tick.css';

export default class SignInBanner extends Component {

  render() {
    const { identity } = this.props;

    function renderAuthenticated(identity) {
      const { name, email } = identity;

      const welcome = name ? `Welcome, ${name}` : 'Welcome';
      const signedIn = email ? `You are signed in with the email address ${email}.` : 'You are signed in.';

      return (
        <div className={ styles.box }>
          <h3 className={ tick.green }>{ welcome }</h3>
          <div>
            { signedIn } <a href="https://login.ubuntu.com/">Manage your SSO account</a>
          </div>
        </div>
      );
    }

    function renderUnauthenticated() {
      return (
        <Anchor style={{ display: 'block' }} href="/login/authenticate">Sign in through Ubuntu One</Anchor>
      );
    }

    return (
      <div className={ styles.banner }>
        { identity.isAuthenticated
          ? renderAuthenticated(identity)
          : renderUnauthenticated() }
      </div>
    );
  }
}

SignInBanner.propTypes = {
  identity: PropTypes.object.isRequired
};

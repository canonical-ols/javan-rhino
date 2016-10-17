import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import SignIn from '../sign-in';

import styles from './header.css';

import logo from './ubuntu-logo.svg';

export default class Header extends Component {
  render() {
    const { identity } = this.props;
    return (
      <div className={ styles.header }>
        <nav className={ styles.container }>
          <Link className={ styles.logo } to="/">
            <img src={ logo } width="107" height="24" alt="Ubuntu" />
          </Link>
          <div className={ styles.sideNav }>
            <SignIn identity={ identity } />
          </div>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  identity: PropTypes.object.isRequired
};

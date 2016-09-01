import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import NavLink from '../navlink';

import styles from './header.css';

import logo from './ubuntu-logo.svg';

export default class Header extends Component {
  render() {
    const { loggedIn } = this.props;

    return (
      <div className={ styles.header }>
        <nav className={ styles.container }>
          <Link className={ styles.logo } to="/">
            <img src={ logo } width="107" height="24" alt="Ubuntu" />
          </Link>
          <div className={ styles.mainNav }>
            <NavLink to="/" onlyActiveOnIndex={ true }>Home</NavLink>
            <NavLink to="/pay/add-card">Add card</NavLink>
            <NavLink to="/about">About</NavLink>
          </div>
          <div className={ styles.sideNav }>
            {!loggedIn &&
              <a href="/login/authenticate" >Login</a>
            }
            {loggedIn &&
              <a>Logout</a>
            }
          </div>
        </nav>
      </div>
    );
  }

  onLoginClick(event) {
    event.preventDefault();
    this.props.onLoginClick();
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
  onLoginClick: PropTypes.func
};

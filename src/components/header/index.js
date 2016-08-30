import React, { Component } from 'react';
import { Link } from 'react-router';

import NavLink from '../navlink';

import style from './header.css';

import logo from './ubuntu-logo.svg';

export default class Header extends Component {
  render() {
    return (
      <div className={ style.header }>
        <nav className={ style.container }>
        <Link className={ style.logo } to="/">
          <img src={ logo } width="107" height="24" alt="Ubuntu" />
        </Link>
        <NavLink className={ style.link } to="/" onlyActiveOnIndex={ true }>Home</NavLink>
        <NavLink className={ style.link } isLast={true} to="/about">About</NavLink>

        <NavLink className={ style.login } isLast={true} to="/login">Login</NavLink>
        </nav>
      </div>
    );
  }
}

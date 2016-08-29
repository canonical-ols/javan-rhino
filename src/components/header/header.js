import React, { Component } from 'react';
import NavLink from '../navlink/navlink';

export default class Header extends Component {
  render() {
    return (
      <div>
        <NavLink to="/" onlyActiveOnIndex={ true }>Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { Link } from 'react-router';

import styles from './navlink.css';

export default class NavLink extends Component {
  render() {
    return <Link {...this.props} className={ styles.link } activeClassName={ styles.active } />;
  }
}

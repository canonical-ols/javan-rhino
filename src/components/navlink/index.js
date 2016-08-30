import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import styles from './navlink.css';

export default class NavLink extends Component {
  render() {
    let { isLast, className, ...other } = this.props;

    return <Link {...other} className={ `${className} ${isLast ? styles.lastLink : styles.link}` } activeClassName={ styles.active } />;
  }
}

NavLink.propTypes = {
  isLast: PropTypes.bool,
  className: PropTypes.string
};

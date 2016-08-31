import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './navlink.css';

export default class NavLink extends Component {
  render() {
    const { isAnchor } = this.props;
    let link;

    if (isAnchor) {
      link = <a href={ this.props.to } className={ styles.link } activeClassName={ styles.active } />;
    } else {
      link = <Link {...this.props} className={ styles.link } activeClassName={ styles.active } />;
    }

    return link;
  }
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  isAnchor: PropTypes.bool
};

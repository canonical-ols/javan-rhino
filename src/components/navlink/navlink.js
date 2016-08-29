import React from 'react';
import { Link } from 'react-router';

import styles from './navlink.css';

export default React.createClass({
  render() {
    return <Link {...this.props} className={ styles.link } activeClassName={ styles.active } />;
  }
});

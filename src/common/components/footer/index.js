import React, { Component } from 'react';
import { Link } from 'react-router';

import styles from './footer.css';

export default class Footer extends Component {
  render() {
    return (
      <div className={ styles.footer }>
        <div className={ styles.container }>
          <p className={ styles.copyright }>© 2016 Canonical Ltd. Ubuntu and Canonical are registered trademarks of Canonical Ltd.</p>
          <p><Link to="/terms">Terms of Service</Link> · <a href="https://github.com/canonical-ols/javan-rhino/issues/new">Report a bug on this site</a></p>
        </div>
      </div>
    );
  }
}

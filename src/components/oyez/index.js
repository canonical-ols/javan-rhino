import React, { Component, PropTypes } from 'react';

import styles from './oyez.css';

export default class Oyez extends Component {
  render() {
    const { status, message } = this.props;
    const statusSuffix = status ? '-' + status : '';

    return (
      <div className={ styles['oyez' + statusSuffix] }>
        <p className={ styles['response' + statusSuffix] }>
          { status && this.getStatus(status) }
          { message }
        </p>
      </div>
    );
  }

  getStatus(status) {
    const statusString = status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <span className={ styles.status }>{ statusString }: </span>
    );
  }
}

Oyez.propTypes = {
  message: PropTypes.string,
  status: PropTypes.oneOf([ 'error', 'success','warning' ])
};

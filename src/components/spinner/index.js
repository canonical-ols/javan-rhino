import React, { Component, PropTypes } from 'react';

import spinner from './spinner.svg';
import styles from './spinner.css';

export default class Spinner extends Component {
  render() {
    const { size } = this.props;
    return (
      <img
        src={ spinner }
        className={ styles.spinner }
        width={ size }
        height={ size }
      />
    );
  }
}

Spinner.propTypes = {
  size: PropTypes.string
};

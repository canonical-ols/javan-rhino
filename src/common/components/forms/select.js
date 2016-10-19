import React, { PropTypes } from 'react';

import styles from './select.css';

export default function Select(props) {
  const { status, ...rest } = props;

  const selectClassName = `${styles.selectInput} ${styles[status]}`;

  return <div className={ styles.select }>
    <select {...rest} className={ selectClassName } onChange={ props.onChange } onBlur={ props.onBlur } />
  </div>;
}

Select.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.node,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  status: PropTypes.oneOf(['success', 'error'])
};

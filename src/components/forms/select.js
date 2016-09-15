import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import styles from './select.css';
const cx = classNames.bind(styles);

export default function Select(props) {
  const { status, ...rest } = props;
  const selectClassName = cx({
    selectInput: true,
    error: status === 'error',
    success: status === 'success'
  });
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

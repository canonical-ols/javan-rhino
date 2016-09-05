import React, { PropTypes } from 'react';

import Label from './label';
import Input from './input';

import styles from './inputField.css';

export default function InputField(props) {
  let { id, label, type, ...other } = props;

  type = type || 'text';

  return <div className={ styles.inputField }>
    <Label htmlFor={ id }>{ label }:</Label>
    <Input id={ id } type={ type } {...other} />
  </div>;
}

InputField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string
};

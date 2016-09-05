import React, { PropTypes } from 'react';
import { uniqueId } from 'lodash/core';

import Label from './label';
import Input from './input';

import styles from './inputField.css';

export default function InputField(props) {
  const { name, label, type='text', placeholder } = props;
  const id = uniqueId(name);

  return <div className={ styles.inputField }>
    <Label htmlFor={ id }>{ label }:</Label>
    <Input {...{ id, type, placeholder }} />
  </div>;
}

InputField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string
};

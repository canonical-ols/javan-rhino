import React, { PropTypes } from 'react';

import Label from './label';

import styles from './inputField.css';

export default function InputField(props) {
  const { name, label, type='text', size='full', placeholder } = props;
  const id = `ID_INPUT_FIELD_${name}`;

  const className = `${styles.inputField} ${styles[size]}`;
  return <div className={ className }>
    <Label htmlFor={ id }>{ label }:</Label>
    <input id={ id } name={ name } type={ type } placeholder={ placeholder } className={ styles.textInput } />
  </div>;
}

InputField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.oneOf(['full', 'small'])
};

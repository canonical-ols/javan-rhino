import React, { PropTypes } from 'react';

import styles from './inputField.css';

export default function InputField(props) {
  const { name, label, type='text', size='full', placeholder } = props;
  const id = `ID_INPUT_FIELD_${name}`;

  const status = props.touched ? (props.valid ? 'success' : 'error') : null;

  const className = `${styles.inputField} ${styles[size]}`;
  const inputClassName = `${styles.textInput} ${styles[status]}`;
  const labelClassName = `${styles.label} ${styles[status]}`;
  const errorMsgClassName = `${styles.errorMsg} ${styles[status]}`;

  return <div className={ className }>
    <label htmlFor={ id } className={ labelClassName }>{ label }:</label>
    <input id={ id } name={ name } type={ type }
      required={ props.required }
      placeholder={ placeholder }
      className={ inputClassName }
      onChange={ props.onChange }
      onBlur={ props.onBlur }
      value={ props.value || '' }
      />
    <label htmlFor={ id } className={ errorMsgClassName }>{ props.errorMsg }</label>
  </div>;
}

InputField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.oneOf(['full', 'small']),
  valid: PropTypes.bool,
  touched: PropTypes.bool,
  value: PropTypes.string,
  errorMsg: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

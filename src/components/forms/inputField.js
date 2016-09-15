import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import Label from './label';

import styles from './inputField.css';
const cx = classNames.bind(styles);

export default function InputField(props) {
  const { name, label, type='text', size='full', placeholder } = props;
  const id = `ID_INPUT_FIELD_${name}`;

  const className = cx({
    inputField: true,
    full: size === 'full',
    small: size === 'small'
  });

  const inputClassName = cx({
    textInput: true,
    success: props.touched && props.valid,
    error: props.touched && !props.valid
  });

  return <div className={ className }>
    <Label htmlFor={ id }>{ label }:</Label>
    <input id={ id } name={ name } type={ type }
      required={ props.required }
      placeholder={ placeholder }
      className={ inputClassName }
      onChange={ props.onChange }
      onBlur={ props.onBlur }
      value={ props.value || '' }
      />
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
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

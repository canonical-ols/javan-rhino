import React, { PropTypes } from 'react';

import Label from './label';
import Select from './select';

import styles from './inputField.css';

export default function SelectField(props) {
  const { name, label, size='full', required, options } = props;
  const id = `ID_SELECT_FIELD_${name}`;

  const className = `${styles.inputField} ${styles[size]}`;

  const status = props.touched ? (props.valid ? 'success' : 'error') : null;

  return <div className={ className }>
    <Label htmlFor={ id }>{ label }:</Label>
    <Select id={ id } name={ name }
      required={ required }
      value={ props.value }
      status={ status }
      onChange={ props.onChange }
      onBlur={ props.onBlur }
    >
      {options.map(function(option){
        return <option key={ `${id}_${option.value}`} value={ option.value }>{ option.name }</option>;
      })}
    </Select>
  </div>;
}

SelectField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['full', 'small']),
  valid: PropTypes.bool,
  touched: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

import React, { PropTypes } from 'react';

import Select from './select';

import styles from './inputField.css';

export default function SelectField(props) {
  const { disabled, name, label, size='full', required, options } = props;
  const id = `ID_SELECT_FIELD_${name}`;
  const status = props.touched ? (props.valid ? 'success' : 'error') : null;

  return <div className={ `${styles.inputField} ${styles[size]} ${disabled ? styles.disabled : ''}` }>
    <label
      htmlFor={ id }
      className={ `${styles.label} ${styles[status]}` }
    >
      { label }:
    </label>
    <Select
      id={ id }
      name={ props.sensitive ? null : name }
      data-name={ name }
      required={ required }
      disabled={ disabled }
      value={ props.value }
      status={ status }
      onChange={ props.onChange }
      onBlur={ props.onBlur }
    >
      {options.map(function(option){
        return <option key={ `${id}_${option.value}`} value={ option.value }>{ option.name }</option>;
      })}
    </Select>
    <label
      htmlFor={ id }
      className={ `${styles.errorMsg} ${styles[status]}` }
    >
      { props.errorMsg }
    </label>
  </div>;
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['full', 'small']),
  sensitive: PropTypes.bool,
  valid: PropTypes.bool,
  touched: PropTypes.bool,
  value: PropTypes.string,
  errorMsg: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

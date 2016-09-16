import React, { PropTypes } from 'react';

import Select from './select';

import styles from './inputField.css';

export default function SelectField(props) {
  const { name, label, size='full', required, options } = props;
  const id = `ID_SELECT_FIELD_${name}`;

  const status = props.touched ? (props.valid ? 'success' : 'error') : null;

  const className = `${styles.inputField} ${styles[size]}`;
  const labelClassName = `${styles.label} ${styles[status]}`;
  const errorMsgClassName = `${styles.errorMsg} ${styles[status]}`;

  return <div className={ className }>
    <label htmlFor={ id } className={ labelClassName }>{ label }:</label>
    <Select id={ id } name={ props.secret ? null : name } data-name={ name }
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
    <label htmlFor={ id } className={ errorMsgClassName }>{ props.errorMsg }</label>
  </div>;
}

SelectField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['full', 'small']),
  secret: PropTypes.bool,
  valid: PropTypes.bool,
  touched: PropTypes.bool,
  value: PropTypes.string,
  errorMsg: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

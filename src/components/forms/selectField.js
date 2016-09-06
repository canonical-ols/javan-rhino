import React, { PropTypes } from 'react';

import Label from './label';
import Select from './select';

import styles from './inputField.css';

export default function SelectField(props) {
  const { name, label, size='full', options } = props;
  const id = `ID_SELECT_FIELD_${name}`;

  const className = `${styles.inputField} ${styles[size]}`;
  return <div className={ className }>
    <Label htmlFor={ id }>{ label }:</Label>
    <Select id={ id } name={ name }>
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
  size: PropTypes.oneOf(['full', 'small'])
};

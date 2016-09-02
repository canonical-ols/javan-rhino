import React, { PropTypes } from 'react';

import Label from './label';

import style from './forms.css';

export default function CheckboxField(props) {
  const { id, label, ...other } = props;

  return <Label htmlFor={ id }>
    <input type="checkbox" id={ id } {...other} className={ style.tickInput } />
    { label }
  </Label>;
}

CheckboxField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string
};

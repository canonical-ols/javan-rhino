import React, { PropTypes } from 'react';
import { uniqueId } from 'lodash/core';

import Label from './label';

import style from './checkboxField.css';

export default function CheckboxField(props) {
  const { name, label } = props;
  const id = uniqueId(name);

  return <Label htmlFor={ id }>
    <input type="checkbox" id={ id } className={ style.tickInput } />
    { label }
  </Label>;
}

CheckboxField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string
};

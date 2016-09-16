import React, { PropTypes } from 'react';

import style from './checkboxField.css';

export default function CheckboxField(props) {
  const { name, label } = props;
  const id = `ID_CHECKBOX_FIELD_${name}`;

  return <label htmlFor={ id }>
    <input type="checkbox" id={ id } className={ style.tickInput } />
    { label }
  </label>;
}

CheckboxField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string
};

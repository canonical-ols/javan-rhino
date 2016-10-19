import React, { PropTypes } from 'react';

import style from './checkboxField.css';

export default function CheckboxField(props) {
  const { name } = props;
  const id = `ID_CHECKBOX_FIELD_${name}`;

  return (
    <label htmlFor={ id } className={ style.checkboxField }>
      <input
        id={ id }
        type="checkbox"
        className={ style.tickInput }
        checked={ props.checked }
        onChange={ props.onChange }
      />
      <span className={ style.label }>{ props.children || props.label }</span>
    </label>
  );
}

CheckboxField.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func
};

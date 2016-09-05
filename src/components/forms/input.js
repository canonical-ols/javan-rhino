import React, { PropTypes } from 'react';

import style from './input.css';

export default function Input(props) {
  return <input {...props} className={ style.textInput }/>;
}

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string
};

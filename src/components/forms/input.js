import React from 'react';

import style from './input.css';

export default function Input(props) {
  return <input {...props} className={ style.textInput }/>;
}

import React from 'react';

import style from './forms.css';

export default function Input(props) {
  return <input {...props} className={ style.textInput }/>;
}

import React from 'react';

import style from './forms.css';

export default function Label(props) {
  return <label {...props} className={ style.label }/>;
}

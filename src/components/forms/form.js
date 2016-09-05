import React from 'react';

import style from './form.css';

export default function Form(props) {
  return <form {...props} className={ style.form }/>;
}

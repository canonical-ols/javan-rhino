import React, { PropTypes } from 'react';

import style from './form.css';

export default function Form(props) {
  return <form onSubmit={ props.onSubmit } className={ style.form }>
    { props.children }
  </form>;
}

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func
};

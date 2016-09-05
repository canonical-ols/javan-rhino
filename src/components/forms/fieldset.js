import React, { PropTypes } from 'react';

import style from './forms.css';

export default function Fieldset(props) {
  return <fieldset className={ style.fieldset }>
    { props.children }
  </fieldset>;
}

Fieldset.propTypes = {
  children: PropTypes.node
};

import React, { PropTypes } from 'react';

import style from './fieldRow.css';

export default function FieldRow(props) {
  return <div className={ style.fieldRow }>
    { props.children }
  </div>;
}

FieldRow.propTypes = {
  children: PropTypes.node
};

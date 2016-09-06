import React, { PropTypes } from 'react';

import style from './select.css';

export default function Select(props) {
  return <div className={ style.select }>
    <select {...props} className={ style.selectInput }/>
  </div>;
}

Select.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.node
};

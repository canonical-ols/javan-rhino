import React, { PropTypes } from 'react';

import styleSelect from './select.css';

export default function Select(props) {
  return <div className={ styleSelect.select }>
    <select {...props} className={ `${styleSelect.selectInput}` }/>
  </div>;
}

Select.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.node
};

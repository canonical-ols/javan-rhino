import React, { PropTypes } from 'react';

import style from './button.css';

export default function Button(props) {
  const { type='primary' } = props;
  return <button {...props} className={ style[type] } />;
}

Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  type: React.PropTypes.oneOf(['primary', 'secondary'])
};

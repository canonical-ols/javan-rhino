import React, { PropTypes } from 'react';

import style from './button.css';

export default function Button(props) {
  const { appearance='primary', ...rest } = props;
  return <button {...rest} className={ style[appearance] } />;
}

Button.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  appearance: React.PropTypes.oneOf(['primary', 'secondary'])
};

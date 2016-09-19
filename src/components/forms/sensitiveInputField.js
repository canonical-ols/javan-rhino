import React, { PropTypes } from 'react';

import InputField from './inputField';

export default function SensitiveInputField(props) {
  return <InputField {...props} sensitive={true} />;
}

SensitiveInputField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  size: PropTypes.oneOf(['full', 'small']),
  valid: PropTypes.bool,
  touched: PropTypes.bool,
  value: PropTypes.string,
  errorMsg: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from './customer-success.css';

export function CustomerSuccess(props) {
  if (!props.customer.tosAccepted) {
    return null;
  }

  return (
    <div className={ styles.customerSuccess }>
      <h3>Thank you</h3>
      <p>Your payment details were successfully saved. Proceed with your purchases in command line using <code className={ styles.code }>snap buy</code> command.</p>
    </div>
  );

}

CustomerSuccess.propTypes = {
  customer: PropTypes.shape({
    isFetching: PropTypes.bool,
    tosAccepted: PropTypes.bool
  }),
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return { customer: state.customer };
}

export default connect(mapStateToProps)(CustomerSuccess);

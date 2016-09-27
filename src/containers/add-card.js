import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { postStripeToken } from '../actions/customer';

import CustomerSuccess from '../components/customer-success';
import PaymentDetails from '../components/payment-details';
import PaymentsForm from '../components/payments-form';

import styles from './container.css';

export class AddCard extends Component {
  handleClick() {
    const { dispatch } = this.props;
    dispatch(postStripeToken('hello-ricardo'));
  }

  render() {
    const boundClick = this.handleClick.bind(this);
    return (
      <div className={ styles.container }>
        <PaymentsForm />
        { this.props.stripe.validatedCardData &&
          <PaymentDetails />
        }
        { this.props.customer.tosAccepted &&
          <CustomerSuccess />
        }
        <button onClick={ boundClick }>Test Send Stripe Token</button>
      </div>
    );
  }
}

AddCard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  customer: PropTypes.shape({
    isFetching: PropTypes.bool,
    tosAccepted: PropTypes.bool
  }).isRequired,
  stripe: PropTypes.shape({
    isFetching: PropTypes.bool,
    validatedCardData: PropTypes.object
  }).isRequired,
};

function mapStateToProps(state) {
  const {
    customer,
    stripe
  } = state;

  return {
    customer,
    stripe
  };
}

export default connect(mapStateToProps)(AddCard);

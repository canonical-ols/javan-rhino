import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { postStripeToken } from '../actions/customer';

import CustomerSuccess from '../components/customer-success';
import SignInBanner from '../components/sign-in-banner';
import PaymentDetails from '../components/payment-details';
import PaymentsForm from '../components/payments-form';
import conf from '../config/';

import styles from './container.css';

export class AddCard extends Component {
  handleClick() {
    const { dispatch } = this.props;
    dispatch(postStripeToken('hello-ricardo'));
  }

  render() {
    const url = conf.get('UNIVERSAL:UBUNTU_SSO_URL');
    const boundClick = this.handleClick.bind(this);
    const { identity } = this.props;
    return (
      <div className={ styles.container }>
        <SignInBanner identity={ identity } url={ url } />
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
  identity: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const {
    identity,
    customer,
    stripe
  } = state;

  return {
    identity,
    customer,
    stripe
  };
}

export default connect(mapStateToProps)(AddCard);

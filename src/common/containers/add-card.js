import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import CustomerSuccess from '../components/customer-success';
import SignInBanner from '../components/sign-in-banner';
import PaymentDetails from '../components/payment-details';
import PaymentsForm from '../components/payments-form';
import Welcome from '../components/welcome';
import conf from '../config/';

import styles from './container.css';

export class AddCard extends Component {

  render() {
    const url = conf.get('UNIVERSAL:UBUNTU_SSO_URL');
    const { identity } = this.props;
    return (
      <div className={ styles.container }>
        <Helmet
          title='Payment details'
        />
        <Welcome />
        <SignInBanner identity={ identity } url={ url } />
        { !this.props.customer.tosAccepted &&
          <PaymentsForm />
        }
        { this.props.customer.tosAccepted &&
          <div>
            <PaymentDetails />
            <CustomerSuccess />
          </div>
        }
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

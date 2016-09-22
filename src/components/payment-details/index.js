import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import countries from '../payments-form/countries';

import styles from './payment-details.css';

const getCountryName = (iso) => {
  const country = countries.filter(country => country.iso === iso);

  if (country.length) {
    return country[0].name;
  }
};

export function PaymentDetails(props) {
  const card = props.stripe.validatedCardData;

  if (!card) {
    return null;
  }

  return (
    <div className={ styles.paymentDetails }>
      <h3>Payment details</h3>
      <div className={ styles.detailsWrapper }>
        <div className={ styles.card }>
          <pre>**** **** **** {card.last4}</pre>
          <p>{ card.name }</p>
        </div>
        <div className={ styles.details }>
          <p className={ styles.cardDetails }>{ card.brand } - { card.last4 }</p>
          <p className={ styles.expiryDetails }>Expires: {`${card.exp_month}/${card.exp_year}`}</p>
          <p>{ card.address_line1 }</p>
          <p>{ card.address_line2 }</p>
          <p>{ card.address_city } { card.address_zip }</p>
          <p>{ getCountryName(card.address_country) }</p>
        </div>
      </div>
    </div>
  );

}

PaymentDetails.propTypes = {
  stripe: PropTypes.object.isRequired,
  customer: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    stripe,
    customer
  } = state;

  return {
    stripe,
    customer
  };
}

export default connect(mapStateToProps)(PaymentDetails);

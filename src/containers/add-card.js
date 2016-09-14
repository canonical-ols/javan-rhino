import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import { postStripeToken } from '../actions/customer';
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
        <Helmet
          script={[
            { src: 'https://js.stripe.com/v2/' }
          ]} />
        <PaymentsForm />
        <button onClick={ boundClick }>Test Send Stripe Token</button>
      </div>
    );
  }
}

AddCard.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    sendStripeToken
  } = state;

  return {
    sendStripeToken
  };
}

export default connect(mapStateToProps)(AddCard);

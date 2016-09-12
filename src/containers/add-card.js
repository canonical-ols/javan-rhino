import React, { Component } from 'react';
import Helmet from 'react-helmet';

import PaymentsForm from '../components/payments-form';

import styles from './container.css';

export default class AddCard extends Component {
  render() {
    return (
      <div className={ styles.container }>
        <Helmet
          script={[
            { src: "https://js.stripe.com/v2/" }
          ]} />
        <PaymentsForm />
      </div>
    );
  }
}

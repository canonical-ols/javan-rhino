import React, { Component } from 'react';

import PaymentsForm from '../components/payments-form';

import styles from './container.css';

export default class AddCard extends Component {
  render() {
    return (
      <div className={ styles.container }>
        <PaymentsForm />
      </div>
    );
  }
}

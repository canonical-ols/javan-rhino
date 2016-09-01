import React, { Component } from 'react';

import styles from './payments-form.css';

import { Form, Input } from '../forms';
//import Input from '../forms/input';

export default class Header extends Component {
  render() {
    return (
      <div className={ styles.paymentsForm }>
      <Form>
        <h3>Payment details</h3>

        <ul className={ styles.fieldset }>
        <li>
          <label htmlFor="customerCountry">Country:</label>
          <Input id="customerCountry" type="text" placeholder="United Kingdom" />
        </li>
        </ul>

        <h4>Name and address</h4>
        <ul className={ styles.fieldset }>
        <li>
          <label htmlFor="customerFullname">Full name:</label>
          <Input id="customerFullname" type="text" placeholder="John Doe" />
        </li>
        <li>
          <label htmlFor="customerAddress1">Address line 1:</label>
          <Input  id="customerAddress1" type="text" placeholder="e.g 20 Ingram Street" />
        </li>
        <li>
          <label htmlFor="customerAddress2">Address line 2:</label>
          <Input id="customerAddress2" type="text" placeholder="Optional" />
        </li>
        <li>
          <label htmlFor="customerState">State/County:</label>
          <Input id="customerState" type="text" placeholder="e.g Essex"/>
        </li>
        <li>
          <label htmlFor="customerCity">Town/City:</label>
          <Input id="customerCity" type="text" placeholder="London"/>
        </li>
        <li>
          <label htmlFor="customerPostcode">Postcode:</label>
          <Input id="customerPostcode" type="text" placeholder="e.g EC1 6DU"/>
        </li>
        <li>
          <label htmlFor="customerCountryCode">Country code:</label>
          <Input id="customerCountryCode" type="text" />
        </li>
        <li>
          <label htmlFor="customerPhone">Phone number:</label>
          <Input id="customerPhone" type="text" placeholder="Optional"/>
        </li>
        </ul>

        <h4>Payment information</h4>
        <p>{"You won't be charged until your next purchase"}</p>
        <ul className={ styles.fieldset }>
        <li>
          <label>Card number:</label>
          <Input type="text" placeholder="1234 5678 9012"/>
        </li>
        <li>
          <label>Expiry date:</label>
          <Input type="text" placeholder="MM/YY" />
        </li>
        <li>
          <label>Security number:</label>
          <Input type="text" placeholder="CVC" />
        </li>
        </ul>
        <label><input type="checkbox" />Credit or debit card number the same as above</label>

        <h4>Billing address</h4>
        <ul className={ styles.fieldset }>
        <li>
        <label htmlFor="billingCountry">Country:</label>
        <Input id="billingCountry" type="text" placeholder="United Kingdom" />
        </li>
        <li>
          <label>Full name:</label>
          <Input type="text" placeholder="John Doe" />
        </li>
        <li>
          <label>Address line 1:</label>
          <Input type="text" placeholder="e.g 20 Ingram Street" />
        </li>
        <li>
          <label>Address line 2:</label>
          <Input type="text" placeholder="Optional" />
        </li>
        <li>
          <label>County:</label>
          <Input type="text" placeholder="e.g Essex"/>
        </li>
        <li>
          <label>Town/City:</label>
          <Input type="text" placeholder="London"/>
        </li>
        <li>
          <label>Postcode:</label>
          <Input type="text" placeholder="e.g EC1 6DU"/>
        </li>
        <li>
          <label>Country code:</label>
          <Input type="text" />
        </li>
        <li>
          <label>Phone number:</label>
          <Input type="text" placeholder="Optional"/>
        </li>
        </ul>

        <button>Add payment details</button>
        </Form>
      </div>
    );
  }
}

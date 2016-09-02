import React, { Component } from 'react';

import styles from './payments-form.css';

import { CheckboxField, Fieldset,  Form, InputField } from '../forms';
//import Input from '../forms/input';

export default class Header extends Component {
  render() {
    return (
      <div className={ styles.paymentsForm }>
      <Form>
        <h3>Payment details</h3>

        <Fieldset>
          <InputField id="customerCountry" label="Country" placeholder="United Kingdom" /> {/* TODO: select? */}
        </Fieldset>

        <Fieldset>
          <h4>Name and address</h4>
          <InputField id="customerFullname" label="Full name" placeholder="John Doe" />
          <InputField id="customerAddress1" label="Address line 1" placeholder="e.g 20 Ingram Street" />
          <InputField id="customerAddress2" label="Address line 2" placeholder="Optional" />
          <InputField id="customerState" label="State/County" placeholder="e.g Essex" />
          <InputField id="customerCity" label="Town/City" placeholder="London" />
          <InputField id="customerPostcode" label="Postcode" placeholder="e.g EC1 6DU" />
          <InputField id="customerCountryCode" label="Country code" /> {/* TODO: select? */}
          <InputField id="customerPhone" label="Phone number" placeholder="Optional" />
        </Fieldset>

        <Fieldset>
          <h4>Payment information</h4>
          <p>{"You won't be charged until your next purchase"}</p>
          <InputField id="cardNumber" label="Card number" placeholder="1234 5678 9012" />
          <InputField id="expiryDate" label="Expiry date" placeholder="MM/YY" />
          <InputField id="securityNumber" label="Security number" placeholder="CVC" />
          <CheckboxField id="billingAddressCheck" label="Credit or debit card number the same as above" />
        </Fieldset>


        <Fieldset>
          <h4>Billing address</h4>
          <InputField id="billingCountry" label="Country" placeholder="United Kingdom" /> {/* TODO: select? */}
          <InputField id="billingFullname" label="Full name" placeholder="John Doe" />
          <InputField id="billingAddress1" label="Address line 1" placeholder="e.g 20 Ingram Street" />
          <InputField id="billingAddress2" label="Address line 2" placeholder="Optional" />
          <InputField id="billingState" label="State/County" placeholder="e.g Essex" />
          <InputField id="billingCity" label="Town/City" placeholder="London" />
          <InputField id="billingPostcode" label="Postcode" placeholder="e.g EC1 6DU" />
          <InputField id="billingCountryCode" label="Country code" /> {/* TODO: select? */}
          <InputField id="billingPhone" label="Phone number" placeholder="Optional" />
        </Fieldset>

        <button>Add payment details</button>
        </Form>
      </div>
    );
  }
}

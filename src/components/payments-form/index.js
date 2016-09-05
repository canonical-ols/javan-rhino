import React, { Component } from 'react';

import { CheckboxField, Fieldset, Form, InputField } from '../forms';

import styles from './payments-form.css';


export default class Header extends Component {
  render() {
    return (
      <div className={ styles.paymentsForm }>
      <Form>
        <h3>Payment details</h3>

        <Fieldset>
          <InputField name="customerCountry" label="Country" placeholder="United Kingdom" /> {/* TODO: select? */}
        </Fieldset>

        <Fieldset>
          <h4>Name and address</h4>
          <InputField name="customerFullname" label="Full name" placeholder="John Doe" />
          <InputField name="customerAddress1" label="Address line 1" placeholder="e.g 20 Ingram Street" />
          <InputField name="customerAddress2" label="Address line 2" placeholder="Optional" />
          <InputField name="customerState" label="State/County" placeholder="e.g Essex" />
          <InputField name="customerCity" label="Town/City" placeholder="London" />
          <InputField name="customerPostcode" label="Postcode" placeholder="e.g EC1 6DU" />
          <InputField name="customerCountryCode" label="Country code" /> {/* TODO: select? */}
          <InputField name="customerPhone" label="Phone number" placeholder="Optional" />
        </Fieldset>

        <Fieldset>
          <h4>Payment information</h4>
          <p>{"You won't be charged until your next purchase"}</p>
          <InputField name="cardNumber" label="Card number" placeholder="1234 5678 9012" />
          <InputField name="expiryDate" label="Expiry date" placeholder="MM/YY" />
          <InputField name="securityNumber" label="Security number" placeholder="CVC" />
          <CheckboxField name="billingAddressCheck" label="Credit or debit card number the same as above" />
        </Fieldset>


        <Fieldset>
          <h4>Billing address</h4>
          <InputField name="billingCountry" label="Country" placeholder="United Kingdom" /> {/* TODO: select? */}
          <InputField name="billingFullname" label="Full name" placeholder="John Doe" />
          <InputField name="billingAddress1" label="Address line 1" placeholder="e.g 20 Ingram Street" />
          <InputField name="billingAddress2" label="Address line 2" placeholder="Optional" />
          <InputField name="billingState" label="State/County" placeholder="e.g Essex" />
          <InputField name="billingCity" label="Town/City" placeholder="London" />
          <InputField name="billingPostcode" label="Postcode" placeholder="e.g EC1 6DU" />
          <InputField name="billingCountryCode" label="Country code" /> {/* TODO: select? */}
          <InputField name="billingPhone" label="Phone number" placeholder="Optional" />
        </Fieldset>

        <button>Add payment details</button>
        </Form>
      </div>
    );
  }
}

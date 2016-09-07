import React, { Component } from 'react';

import Button from '../button';
import countries from './countries';
import { CheckboxField, Fieldset, FieldRow, Form, InputField, SelectField } from '../forms';

import styles from './payments-form.css';

export default class PaymentsForm extends Component {
  onSubmit(event) {
    event.preventDefault();
  }

  mapCountriesToOptions(countries) {
    let options = countries.map(country => ({ value: country.iso, name: country.name }));
    options = [ { value: '', name: '-----------' }, ...options ];
    return options;
  }

  render() {
    return (
      <div className={ styles.paymentsForm }>
      <Form onSubmit={ this.onSubmit.bind(this) }>
        <h3>Payment details</h3>

        <Fieldset>
          <SelectField name="customerCountry" label="Country" options={ this.mapCountriesToOptions(countries) } />
        </Fieldset>

        <Fieldset>
          <h4>Name and address</h4>
          <InputField name="customerFullname" label="Full name" placeholder="John Doe" />
          <InputField name="customerAddress1" label="Address line 1" placeholder="e.g 20 Ingram Street" />
          <InputField name="customerAddress2" label="Address line 2" placeholder="Optional" />
          <InputField name="customerState" label="State/County" placeholder="e.g Essex" />
          <FieldRow>
            <InputField name="customerCity" label="Town/City" placeholder="London" size="small"/>
            <InputField name="customerPostcode" label="Postcode" placeholder="e.g EC1 6DU" size="small" />
          </FieldRow>
          <FieldRow>
            <InputField name="customerCountryCode" label="Country code" size="small" /> {/* TODO: confirm if needed */}
            <InputField name="customerPhone" label="Phone number" placeholder="Optional" />
          </FieldRow>
        </Fieldset>

        <Fieldset>
          <h4>Payment information</h4>
          <p>{"You won't be charged until your next purchase"}</p>
          <InputField name="cardNumber" label="Card number" placeholder="1234 5678 9012" />
          <InputField name="expiryDate" label="Expiry date" placeholder="MM/YY" />
          <InputField name="securityNumber" label="Security number" placeholder="CVC" />
          <CheckboxField name="billingAddressCheck" label="Credit or debit card address is the same as above" />
        </Fieldset>

        <Fieldset>
          <h4>Billing address</h4>
          <SelectField name="billingCountry" label="Country" options={ this.mapCountriesToOptions(countries) } />
          <InputField name="billingFullname" label="Full name" placeholder="John Doe" />
          <InputField name="billingAddress1" label="Address line 1" placeholder="e.g 20 Ingram Street" />
          <InputField name="billingAddress2" label="Address line 2" placeholder="Optional" />
          <InputField name="billingState" label="State/County" placeholder="e.g Essex" />
          <FieldRow>
            <InputField name="billingCity" label="Town/City" placeholder="London" size="small"/>
            <InputField name="billingPostcode" label="Postcode" placeholder="e.g EC1 6DU" size="small" />
          </FieldRow>
          <FieldRow>
            <InputField name="billingCountryCode" label="Country code" size="small" /> {/* TODO: select? */}
            <InputField name="billingPhone" label="Phone number" placeholder="Optional" />
          </FieldRow>
        </Fieldset>

        <Button appearance='secondary'>Add payment details</Button>
        </Form>
      </div>
    );
  }
}

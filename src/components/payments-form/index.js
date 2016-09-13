import React, { Component } from 'react';

import Button from '../button';
import countries from './countries';
import { CheckboxField, Fieldset, FieldRow, Form, InputField, SelectField } from '../forms';

import styles from './payments-form.css';

export default class PaymentsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: this.getInitialValues()
    };
  }

  getInitialValues() {
    const initialState = {
      value: '',
      valid: false,
      touched: false,
      required: true
    };

    const names = [
      'customerCountry',
      'customerFullname',
      'customerAddress1',
      'customerAddress2',
      'customerState',
      'customerCity',
      'customerPostcode',
      'customerCountryCode',
      'customerPhone',
      'cardNumber',
      'expiryDate',
      'securityNumber',
      'billingCountry',
      'billingFullname',
      'billingAddress1',
      'billingAddress2',
      'billingState',
      'billingCity',
      'billingPostcode',
      'billingCountryCode',
      'billingPhone'
    ];

    const optional = [
      'customerAddress2',
      'billingAddress2',
      'customerCountryCode',
      'billingCountryCode',
      'customerPhone',
      'billingPhone'
    ];

    const fields = {};
    // initialise all fields with default values and state
    names.forEach(name => fields[name] = { ...initialState, name });
    // mark optional field as not required
    optional.forEach(name => fields[name].required = false);

    return fields;
  }

  validate(fields) {
    Object.keys(fields).forEach((name) => {
      const field = fields[name];
      // field is required but empty
      if (field.required && !field.value) {
        field.valid = false;
        field.touched = true;
      }
    });

    return fields;
  }

  onSubmit(event) {
    const fields = this.validate(this.state.fields);

    this.setState({
      fields: fields
    });

    event.preventDefault();
  }

  onChange(event) {
    const { target } = event;

    // update fields state with new value
    const fields = { ...this.state.fields };
    fields[target.name].value = target.value;

    this.setState({
      fields: fields
    });
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
          <SelectField
            label="Country"
            options={ this.mapCountriesToOptions(countries) }
            {...this.state.fields.customerCountry}
            onChange={ this.onChange.bind(this) }
          />
        </Fieldset>

        <Fieldset>
          <h4>Name and address</h4>
          <InputField
            label="Full name"
            placeholder="John Doe"
            {...this.state.fields.customerFullname}
            onChange={ this.onChange.bind(this) }
          />
          <InputField
            label="Address line 1"
            placeholder="e.g 20 Ingram Street"
            {...this.state.fields.customerAddress1}
            onChange={ this.onChange.bind(this) }
          />
          <InputField
            label="Address line 2"
            placeholder="Optional"
            {...this.state.fields.customerAddress2}
            onChange={ this.onChange.bind(this) }
          />
          <InputField
            label="State/County"
            placeholder="e.g Essex"
            {...this.state.fields.customerState}
            onChange={ this.onChange.bind(this) }
          />
          <FieldRow>
            <InputField
              label="Town/City"
              placeholder="London"
              size="small"
              {...this.state.fields.customerCity}
              onChange={ this.onChange.bind(this) }
            />
            <InputField
              name="customerPostcode"
              label="Postcode"
              placeholder="e.g EC1 6DU"
              size="small"
              {...this.state.fields.customerPostcode}
              onChange={ this.onChange.bind(this) }
            />
          </FieldRow>
          <FieldRow>
            {/* TODO: confirm if customerCountryCode needed */}
            <InputField
              label="Country code"
              size="small"
              {...this.state.fields.customerCountryCode}
              onChange={ this.onChange.bind(this) }
            />
            <InputField
              label="Phone number"
              placeholder="Optional"
              {...this.state.fields.customerPhone}
              onChange={ this.onChange.bind(this) }
            />
          </FieldRow>
        </Fieldset>

        <Fieldset>
          <h4>Payment information</h4>
          <p>{"You won't be charged until your next purchase"}</p>
          <InputField
            label="Card number"
            placeholder="1234 5678 9012"
            {...this.state.fields.cardNumber}
            onChange={ this.onChange.bind(this) }
          />
          <InputField
            label="Expiry date"
            placeholder="MM/YY"
            {...this.state.fields.expiryDate}
            onChange={ this.onChange.bind(this) }
          />
          <InputField
            label="Security number"
            placeholder="CVC"
            {...this.state.fields.securityNumber}
            onChange={ this.onChange.bind(this) }
          />

          {/* TODO: how to handle clicking this? */}
          <CheckboxField
            name="billingAddressCheck"
            label="Credit or debit card address is the same as above"
          />
        </Fieldset>

        <Fieldset>
          <h4>Billing address</h4>
          <SelectField
            label="Country"
            options={ this.mapCountriesToOptions(countries) }
            {...this.state.fields.billingCountry}
            onChange={ this.onChange.bind(this) }
          />
          <InputField
            label="Full name"
            placeholder="John Doe"
            {...this.state.fields.billingFullname}
            onChange={ this.onChange.bind(this) }
          />
          <InputField
            label="Address line 1"
            placeholder="e.g 20 Ingram Street"
            {...this.state.fields.billingAddress1}
            onChange={ this.onChange.bind(this) }
          />
          <InputField
            label="Address line 2"
            placeholder="Optional"
            {...this.state.fields.billingAddress2}
            onChange={ this.onChange.bind(this) }
          />
          <InputField
            label="State/County"
            placeholder="e.g Essex"
            {...this.state.fields.billingState}
            onChange={ this.onChange.bind(this) }
          />
          <FieldRow>
            <InputField
              label="Town/City"
              placeholder="London"
              size="small"
              {...this.state.fields.billingCity}
              onChange={ this.onChange.bind(this) }
            />
            <InputField
              name="customerPostcode"
              label="Postcode"
              placeholder="e.g EC1 6DU"
              size="small"
              {...this.state.fields.billingPostcode}
              onChange={ this.onChange.bind(this) }
            />
          </FieldRow>
          <FieldRow>
            {/* TODO: confirm if billingCountryCode needed */}
            <InputField
              label="Country code"
              size="small"
              {...this.state.fields.billingCountryCode}
              onChange={ this.onChange.bind(this) }
            />
            <InputField
              label="Phone number"
              placeholder="Optional"
              {...this.state.fields.billingPhone}
              onChange={ this.onChange.bind(this) }
            />
          </FieldRow>
        </Fieldset>

        <Button appearance='secondary'>Add payment details</Button>
        </Form>
      </div>
    );
  }
}

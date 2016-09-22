import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Button from '../button';
import countries from './countries';
import {
  CheckboxField,
  Fieldset,
  FieldRow,
  Form,
  InputField,
  Message,
  SelectField,
  SensitiveInputField
} from '../forms';

import { validateNonEmpty, validateCardNumber, validateExpiry, validateCVC } from '../../validation';

import styles from './payments-form.css';

import { postCardData } from '../../actions/stripe';

export class PaymentsForm extends Component {

  /* INITIALISATION */

  constructor(props) {
    super(props);

    this.state = {
      isBillingAddressTheSame: false,
      fields: this.getInitialValues()
    };
  }

  getFieldsNames() {
    return [
      'customerFullname',
      'customerAddress1',
      'customerAddress2',
      'customerState',
      'customerCity',
      'customerCountry', // value is ISO code from select, TODO: do we need to store name?
      'customerPostcode',
      //'customerCountryCode', TODO: do we need separate code field?
      'customerPhone',

      'cardNumber',
      'expiryDate',
      'securityNumber',

      'billingFullname',
      'billingAddress1',
      'billingAddress2',
      'billingState',
      'billingCity',
      'billingCountry', // value is ISO code from select, TODO: do we need to store name?
      'billingPostcode',
      //'billingCountryCode', TODO: do we need separate code field?
      'billingPhone'
    ];
  }

  getInitialValues() {
    const initialState = {
      value: '',
      valid: false,
      touched: false,
      required: true
    };

    const names = this.getFieldsNames();

    const optional = [
      'customerAddress2',
      'billingAddress2',
      'customerPhone',
      'billingPhone'
    ];

    // binding between customer and billing address (if checkbox is checked)
    const addressBindings = {
      'customerCountry': 'billingCountry',
      'customerFullname': 'billingFullname',
      'customerAddress1': 'billingAddress1',
      'customerAddress2': 'billingAddress2',
      'customerState': 'billingState',
      'customerCity': 'billingCity',
      'customerPostcode': 'billingPostcode',
      'customerPhone': 'billingPhone'
    };

    const fields = {};
    // initialise all fields with default values and state
    names.forEach(name => fields[name] = { ...initialState, addressBinding: addressBindings[name], name });
    // mark optional field as not required
    optional.forEach(name => fields[name].required = false);

    return fields;
  }

  /* RENDER */

  render() {
    const isFetching = this.props.customer.isFetching || this.props.stripe.isFetching;

    return (
      <div className={ styles.paymentsForm }>
        <Form onSubmit={ this.onSubmit.bind(this) }>
          <h3>Payment details</h3>

          <Fieldset>
            <h4>Name and address</h4>
            <InputField
              label="Full name"
              placeholder="John Doe"
              {...this.state.fields.customerFullname}
              onChange={ this.onChange.bind(this) }
              onBlur={ this.onBlur.bind(this) }
            />
            <InputField
              label="Address line 1"
              placeholder="e.g 20 Ingram Street"
              {...this.state.fields.customerAddress1}
              onChange={ this.onChange.bind(this) }
              onBlur={ this.onBlur.bind(this) }
            />
            <InputField
              label="Address line 2"
              placeholder="Optional"
              {...this.state.fields.customerAddress2}
              onChange={ this.onChange.bind(this) }
              onBlur={ this.onBlur.bind(this) }
            />
            <InputField
              label="State/County"
              placeholder="e.g Essex"
              {...this.state.fields.customerState}
              onChange={ this.onChange.bind(this) }
              onBlur={ this.onBlur.bind(this) }
            />
            <FieldRow>
              <InputField
                label="Town/City"
                placeholder="London"
                size="small"
                {...this.state.fields.customerCity}
                onChange={ this.onChange.bind(this) }
                onBlur={ this.onBlur.bind(this) }
              />
              <InputField
                name="customerPostcode"
                label="Postcode"
                placeholder="e.g EC1 6DU"
                size="small"
                {...this.state.fields.customerPostcode}
                onChange={ this.onChange.bind(this) }
                onBlur={ this.onBlur.bind(this) }
              />
            </FieldRow>
            <FieldRow>
              <SelectField
                label="Country"
                size="small"
                options={ this.mapCountriesToOptions(countries) }
                {...this.state.fields.customerCountry}
                onChange={ this.onChange.bind(this) }
                onBlur={ this.onBlur.bind(this) }
              />
              <InputField
                label="Phone number"
                placeholder="Optional"
                size="small"
                {...this.state.fields.customerPhone}
                onChange={ this.onChange.bind(this) }
                onBlur={ this.onBlur.bind(this) }
              />
            </FieldRow>
          </Fieldset>

          <Fieldset>
            <h4>Payment information</h4>
            <Message status="info" text="You won't be charged until your next purchase" />
            <SensitiveInputField
              label="Card number"
              placeholder="1234 5678 9012"
              {...this.state.fields.cardNumber}
              onChange={ this.onChange.bind(this) }
              onBlur={ this.onBlur.bind(this) }
            />
            <SensitiveInputField
              label="Expiry date"
              placeholder="MM/YY"
              {...this.state.fields.expiryDate}
              onChange={ this.onChange.bind(this) }
              onBlur={ this.onBlur.bind(this) }
            />
            <SensitiveInputField
              label="Security number"
              placeholder="CVC"
              {...this.state.fields.securityNumber}
              onChange={ this.onChange.bind(this) }
              onBlur={ this.onBlur.bind(this) }
            />

            <CheckboxField
              name="billingAddressCheck"
              label="Credit or debit card address is the same as above"
              onChange={ this.onBillingAddressClick.bind(this) }
            />
          </Fieldset>

          <Fieldset>
            <h4>Billing address</h4>
            <InputField
              label="Full name"
              placeholder="John Doe"
              disabled={ this.state.isBillingAddressTheSame }
              {...this.state.fields.billingFullname}
              onChange={ this.onChange.bind(this) }
              onBlur={ this.onBlur.bind(this) }
            />
            <InputField
              label="Address line 1"
              placeholder="e.g 20 Ingram Street"
              disabled={ this.state.isBillingAddressTheSame }
              {...this.state.fields.billingAddress1}
              onChange={ this.onChange.bind(this) }
              onBlur={ this.onBlur.bind(this) }
            />
            <InputField
              label="Address line 2"
              placeholder="Optional"
              disabled={ this.state.isBillingAddressTheSame }
              {...this.state.fields.billingAddress2}
              onChange={ this.onChange.bind(this) }
              onBlur={ this.onBlur.bind(this) }
            />
            <InputField
              label="State/County"
              placeholder="e.g Essex"
              disabled={ this.state.isBillingAddressTheSame }
              {...this.state.fields.billingState}
              onChange={ this.onChange.bind(this) }
              onBlur={ this.onBlur.bind(this) }
            />
            <FieldRow>
              <InputField
                label="Town/City"
                placeholder="London"
                size="small"
                disabled={ this.state.isBillingAddressTheSame }
                {...this.state.fields.billingCity}
                onChange={ this.onChange.bind(this) }
                onBlur={ this.onBlur.bind(this) }
              />
              <InputField
                name="customerPostcode"
                label="Postcode"
                placeholder="e.g EC1 6DU"
                size="small"
                disabled={ this.state.isBillingAddressTheSame }
                {...this.state.fields.billingPostcode}
                onChange={ this.onChange.bind(this) }
                onBlur={ this.onBlur.bind(this) }
              />
            </FieldRow>
            <FieldRow>
              <SelectField
                label="Country"
                size="small"
                options={ this.mapCountriesToOptions(countries) }
                disabled={ this.state.isBillingAddressTheSame }
                {...this.state.fields.billingCountry}
                onChange={ this.onChange.bind(this) }
                onBlur={ this.onBlur.bind(this) }
              />
              <InputField
                label="Phone number"
                placeholder="Optional"
                size="small"
                disabled={ this.state.isBillingAddressTheSame }
                {...this.state.fields.billingPhone}
                onChange={ this.onChange.bind(this) }
                onBlur={ this.onBlur.bind(this) }
              />
            </FieldRow>
          </Fieldset>

          <Button appearance='secondary' disabled={isFetching}>
            Add payment details
          </Button>
        </Form>
      </div>
    );
  }

  /* HELPERS */

  mapCountriesToOptions(countries) {
    let options = countries.map(country => ({ value: country.iso, name: country.name }));
    options = [ { value: '', name: '-----------' }, ...options ];
    return options;
  }

  isFormValid(fields) {
    return !Object.keys(fields).map(name => fields[name]).filter(field => !field.valid).length;
  }

  /* VALIDATION */

  validate(fields, { forceTouched }={}) {
    Object.keys(fields).forEach((name) => {
      const field = fields[name];

      field.valid = true; // every field is valid until said otherwise

      // field is required but empty
      if (field.required) {
        field.valid = validateNonEmpty(field.value);
        field.errorMsg = 'This field is required';
      }

      if (name === 'cardNumber') {
        field.valid = validateCardNumber(field.value);
        field.errorMsg = 'This is not a valid card number';
      }

      if (name === 'expiryDate') {
        field.valid = validateExpiry(field.value);
        field.errorMsg = 'This is not a valid expiry date';
      }

      if (name === 'securityNumber') {
        field.valid = validateCVC(field.value);
        field.errorMsg = 'This is not a valid CVC security number';
      }

      if (forceTouched) {
        field.touched = true;
      }
    });

    return fields;
  }

  /* EVENT HANDLERS */

  onSubmit(event) {
    const fields = this.validate(this.state.fields, { forceTouched: true });

    this.setState({
      fields: fields
    });

    if (this.isFormValid(fields)) {
      // post card data to recieve token
      this.props.dispatch(postCardData({
        cardNumber: fields.cardNumber.value,
        securityNumber: fields.securityNumber.value,
        expiryDate: fields.expiryDate.value,

        name: fields.billingFullname.value,
        addressLine1: fields.billingAddress1.value,
        addressLine2: fields.billingAddress2.value,
        city: fields.billingCity.value,
        state: fields.billingState.value,
        postcode: fields.billingPostcode.value,
        country: fields.billingCountry.value,
      }));
    }

    event.preventDefault();
  }

  onChange(event) {
    const { target } = event;

    // update fields state with new value
    let fields = { ...this.state.fields };
    const name = target.dataset.name;
    fields[name].value = target.value;

    if (this.state.isBillingAddressTheSame && fields[name].addressBinding) {
      fields[ fields[name].addressBinding ].value = target.value;
    }

    // revalidate fields to update validation status (especally of bound address fields)
    fields = this.validate(fields);

    this.setState({
      fields: fields
    });
  }

  onBlur(event) {
    const { target } = event;

    // update fields state with new value
    let fields = { ...this.state.fields };
    fields[target.dataset.name].touched = true;

    fields = this.validate(fields);

    this.setState({
      fields: fields
    });
  }

  onBillingAddressClick(event) {
    let fields = this.state.fields;

    if (event.target.checked) {
      Object.keys(fields).forEach((name) => {
        const field = fields[name];
        if (field.addressBinding) {
          fields[ field.addressBinding ].value = field.value;
        }
      });
    }

    // revalidate fields to update validation status (especally of bound address fields)
    fields = this.validate(fields);

    this.setState({
      isBillingAddressTheSame: event.target.checked,
      fields: fields
    });
  }

}

PaymentsForm.propTypes = {
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

export default connect(mapStateToProps)(PaymentsForm);

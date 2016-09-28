import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import Button from '../button';
import countries from './countries';
import {
  Fieldset,
  FieldRow,
  Form,
  InputField,
  Message,
  SelectField,
  SensitiveInputField
} from '../forms';
import { validateNonEmpty, validateCardNumber, validateExpiry, validateCVC } from '../../validation';
import { postCardData } from '../../actions/stripe';
import styles from './payments-form.css';

const cx = classNames.bind(styles);

export class PaymentsForm extends Component {

  /* INITIALISATION */

  constructor(props) {
    super(props);

    this.state = {
      fields: this.getInitialValues()
    };
  }

  getFieldsNames() {
    return [
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
      'billingAddress2',
      'billingPhone'
    ];

    const fields = {};
    // initialise all fields with default values and state
    names.forEach(name => fields[name] = { ...initialState, name });
    // mark optional field as not required
    optional.forEach(name => fields[name].required = false);

    return fields;
  }

  /* RENDER */

  render() {
    const isFetching = this.props.customer.isFetching || this.props.stripe.isFetching;

    const { identity } = this.props;

    if (this.props.stripe.validatedCardData) {
      return null;
    }

    let className = cx({
      paymentsForm: true,
      disabled: !identity.isAuthenticated
    });

    return (
      <div className={ className }>
        <Form onSubmit={ this.onSubmit.bind(this) }>
          <h3>Payment details</h3>

          <Fieldset>
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
          </Fieldset>

          <Fieldset>
            <h4>Billing address</h4>
            <InputField
              label="Full name"
              placeholder="John Doe"
              {...this.state.fields.billingFullname}
              onChange={ this.onChange.bind(this) }
              onBlur={ this.onBlur.bind(this) }
            />
            <InputField
              label="Address line 1"
              placeholder="e.g 20 Ingram Street"
              {...this.state.fields.billingAddress1}
              onChange={ this.onChange.bind(this) }
              onBlur={ this.onBlur.bind(this) }
            />
            <InputField
              label="Address line 2"
              placeholder="Optional"
              {...this.state.fields.billingAddress2}
              onChange={ this.onChange.bind(this) }
              onBlur={ this.onBlur.bind(this) }
            />
            <InputField
              label="State/County"
              placeholder="e.g Essex"
              {...this.state.fields.billingState}
              onChange={ this.onChange.bind(this) }
              onBlur={ this.onBlur.bind(this) }
            />
            <FieldRow>
              <InputField
                label="Town/City"
                placeholder="London"
                size="small"
                {...this.state.fields.billingCity}
                onChange={ this.onChange.bind(this) }
                onBlur={ this.onBlur.bind(this) }
              />
              <InputField
                name="customerPostcode"
                label="Postcode"
                placeholder="e.g EC1 6DU"
                size="small"
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
                {...this.state.fields.billingCountry}
                onChange={ this.onChange.bind(this) }
                onBlur={ this.onBlur.bind(this) }
              />
              <InputField
                label="Phone number"
                placeholder="Optional"
                size="small"
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

}

PaymentsForm.propTypes = {
  identity: PropTypes.object.isRequired,
  stripe: PropTypes.shape({
    isFetching: PropTypes.bool,
    validatedCardData: PropTypes.object
  }).isRequired,
  customer: PropTypes.shape({
    isFetching: PropTypes.bool
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {
    identity,
    stripe,
    customer
  } = state;

  return {
    identity,
    stripe,
    customer
  };
}

export default connect(mapStateToProps)(PaymentsForm);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';

import Button from '../button';
import Spinner from '../spinner';
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
import { postCardData } from '../../actions/stripe';
import styles from './payments-form.css';
import tick from '../../style/tick.css';

const cx = classNames.bind(styles);

export class PaymentsForm extends Component {

  /* INITIALISATION */

  constructor(props) {
    super(props);

    this.state = {
      isTosAccepted: false,
      fields: this.getInitialValues()
    };
  }

  getInitialValues() {
    const initialState = {
      value: '',
      valid: false,
      touched: false
    };

    return {
      cardNumber: {
        name: 'cardNumber',
        label: 'Card number',
        required: true,
        ...initialState
      },
      expiryDate: {
        name: 'expiryDate',
        label: 'Expiry date',
        required: true,
        ...initialState
      },
      securityNumber: {
        name: 'securityNumber',
        label: 'Security number',
        required: true,
        ...initialState
      },
      billingFullname: {
        name: 'billingFullname',
        label: 'Full name',
        required: true,
        ...initialState
      },
      billingAddress1: {
        name: 'billingAddress1',
        label: 'Address line 1',
        required: true,
        ...initialState
      },
      billingAddress2: {
        name: 'billingAddress2',
        label: 'Address line 2',
        required: false,
        ...initialState
      },
      billingState: {
        name: 'billingState',
        label: 'State/County',
        required: true,
        ...initialState
      },
      billingCity: {
        name: 'billingCity',
        label: 'Town/City',
        required: true,
        ...initialState

      },
      billingCountry: {
        name: 'billingCountry',
        label: 'Country',
        required: true,
        ...initialState
      },
      billingPostcode: {
        name: 'billingPostcode',
        label: 'Postcode',
        required: true,
        ...initialState
      },
      billingPhone: {
        name: 'billingPhone',
        label: 'Phone number',
        required: false,
        ...initialState
      }
    };
  }

  /* RENDER */

  render() {
    const isFetching = this.props.customer.isFetching || this.props.stripe.isFetching;
    const isFormReady = this.state.isTosAccepted && !isFetching;
    const errorMsg = this.getFirstErrorMessage(this.state.fields);

    const { identity } = this.props;

    let className = cx({
      paymentsForm: true,
      disabled: !identity.isAuthenticated
    });

    return (
      <div className={ className }>
        <Form onSubmit={ this.onSubmit.bind(this) }>
          <h3 className={ tick.grey }>Payment details</h3>

          <Fieldset>
            <Message status="info" text="You won't be charged until your next purchase" />
            <SensitiveInputField
              label="Card number"
              placeholder="4321 1234 5678 9012"
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

          <Fieldset>
            <CheckboxField
              name="tosAccepted"
              checked={ this.state.isTosAccepted }
              onChange={ this.onTosAcceptClick.bind(this) }
            >
              I agree that my use of any services or related APIs is subject to my compliance with the applicable <a href="/terms" target="_blank">Terms of service</a>
            </CheckboxField>
            <div className={ styles['button-container'] }>
              <Button data-qa="payments-form:submit" appearance='secondary' disabled={!isFormReady}>
                Add payment details
              </Button>
              { isFetching &&
                <div className={ styles.spinner }>
                  <Spinner size="20px" />
                </div>
              }
            </div>
            { errorMsg &&
              <div className={ `${styles.errorMsg} ${styles['error']}` }>
                { errorMsg }
              </div>
            }
          </Fieldset>
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
        field.errorMsg = field.label + ' field is required';
      }

      if (name === 'cardNumber') {
        field.valid = validateCardNumber(field.value);
        field.errorMsg = 'Invalid card number';
      }

      if (name === 'expiryDate') {
        field.valid = validateExpiry(field.value);
        field.errorMsg = 'Invalid expiry date';
      }

      if (name === 'securityNumber') {
        field.valid = validateCVC(field.value);
        field.errorMsg = 'Invalid security number';
      }

      if (forceTouched) {
        field.touched = true;
      }
    });

    return fields;
  }

  getFirstErrorMessage(fields) {
    let errorMsg;

    Object.keys(fields).forEach((name) => {
      let field = fields[name];

      if (field.valid === false && field.touched && !errorMsg) {
        errorMsg = field.errorMsg;
      }
    });

    return errorMsg;
  }

  /* EVENT HANDLERS */

  onTosAcceptClick(event) {
    this.setState({
      isTosAccepted: event.target.checked
    });
  }

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

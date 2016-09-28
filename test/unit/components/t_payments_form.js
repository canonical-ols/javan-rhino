import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { stub } from 'sinon';

import { PaymentsForm } from '../../../src/components/payments-form';
import { Form } from '../../../src/components/forms';

describe('<PaymentsForm /> component', () => {
  let wrapper;

  beforeEach(() => {
    // mocking redux props
    const props = {
      identity: {
        isAuthenticated: false
      },
      stripe: {},
      customer: {},
      dispatch: () => {}
    };

    wrapper = shallow(<PaymentsForm {...props} />);
  });

  it('should render a <Form> component', () => {
    expect(wrapper.find(Form).length).toBe(1);
  });

  describe('<PaymentsForm /> component with authenticated user', () => {
    beforeEach(() => {
      // mocking redux props
      const props = {
        identity: {
          isAuthenticated: true
        },
        stripe: {},
        customer: {},
        dispatch: () => {}
      };

      wrapper = shallow(<PaymentsForm {...props} />);
    });
    it('renders without disabled class', () => {
      expect(wrapper.hasClass('disabled')).toBe(false);
    });
  });

  context('validation', () => {
    let validate;

    beforeEach(() => {
      validate = wrapper.instance().validate;
    });

    it('should be implemented', () => {
      expect(validate).toBeA('function');
    });

    context('when validating required fields', () => {
      const fields = {
        optionalField: { value: '', required: false },
        requiredEmptyField: { value: '', required: true },
        requiredEnteredField: { value: 'some value', required: true }
      };
      let results;

      beforeEach(() => {
        results = validate(fields);
      });

      it('should mark optional fields valid', () => {
        expect(results.optionalField.valid).toBe(true);
      });

      it('should mark required fields with values valid', () => {
        expect(results.requiredEnteredField.valid).toBe(true);
      });

      it('should mark empty required fields invalid', () => {
        expect(results.requiredEmptyField.valid).toBe(false);
      });
    });

    context('when checking if form is valid', () => {
      let isFormValid, fields;

      beforeEach(() => {
        isFormValid = wrapper.instance().isFormValid;

        fields = {
          firstTestField: {
            value: '',
            valid: false,
            touched: false
          },
          secondTestField: {
            value: '',
            valid: false,
            touched: false
          }
        };
      });

      it('should return true if all fields are valid', () => {
        fields['firstTestField'].valid = true;
        fields['secondTestField'].valid = true;

        expect(isFormValid(fields)).toBe(true);
      });

      it('should return false if any field is invalid', () => {
        fields['firstTestField'].valid = true;
        fields['secondTestField'].valid = false;

        expect(isFormValid(fields)).toBe(false);
      });

    });

  });

  context('on input change', () => {

    let onChange;

    const createChangeEvent = (name, value) => ({
      target: {
        dataset: { name },
        value
      }
    });

    beforeEach(() => {
      onChange = wrapper.instance().onChange.bind(wrapper.instance());

      // stub validate method so it doesn't try to call global Stripe
      stub(wrapper.instance(), 'validate', fields => fields);

      // put test fields into state
      wrapper.instance().setState({
        fields: {
          firstTestField: {
            value: '',
            valid: false,
            touched: false
          },
          secondTestField: {
            value: '',
            valid: false,
            touched: false,
            addressBinding: 'firstTestField'
          }
        }
      });
    });

    context('when address fields are not bound together', () => {
      beforeEach(() => {
        wrapper.instance().setState({
          isBillingAddressTheSame: false
        });
      });

      it('should update the value of given field in component state', () => {
        onChange(createChangeEvent('firstTestField', 'test value'));

        expect(wrapper.state('fields')['firstTestField'].value).toBe('test value');
      });

      it('should not update the value of bound address field', () => {
        onChange(createChangeEvent('secondTestField', 'test value 4321'));

        expect(wrapper.state('fields')['firstTestField'].value).toNotBe('test value 4321');
      });
    });

    context('when address fields are bound together', () => {
      beforeEach(() => {
        wrapper.instance().setState({
          isBillingAddressTheSame: true
        });
      });

      it('should update the value of given field in component state', () => {
        onChange(createChangeEvent('firstTestField', 'test value'));

        expect(wrapper.state('fields')['firstTestField'].value).toBe('test value');
      });

      it('should update the value of bound address field', () => {
        onChange(createChangeEvent('secondTestField', 'test value 4321'));

        expect(wrapper.state('fields')['firstTestField'].value).toBe('test value 4321');
      });
    });


  });
});

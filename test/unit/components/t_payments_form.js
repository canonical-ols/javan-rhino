import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import PaymentsForm from '../../../src/components/payments-form';
import { Form } from '../../../src/components/forms';

describe('<PaymentsForm /> component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<PaymentsForm  />);
  });

  it('should render a <Form> component', () => {
    expect(wrapper.find(Form).length).toBe(1);
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

  });

});

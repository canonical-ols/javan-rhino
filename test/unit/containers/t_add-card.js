import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import { AddCard } from '../../../src/containers/add-card';
import Welcome from '../../../src/components/welcome';
import SignInBanner from '../../../src/components/sign-in-banner';
import PaymentsForm from '../../../src/components/payments-form';
import PaymentDetails from '../../../src/components/payment-details';
import CustomerSuccess from '../../../src/components/customer-success';

describe('<AddCard /> container', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      identity: {
      },
      stripe: {
        validatedCardData: false
      },
      customer: {
        tosAccepted: false
      }
    };
    wrapper = shallow(<AddCard { ...props }/>);
  });

  it('should have a welcome component', () => {
    expect(wrapper.find(Welcome).length).toBe(1);
  });

  it('should have a sign in banner component', () => {
    expect(wrapper.find(SignInBanner).length).toBe(1);
  });

  it('should have a payments form component', () => {
    expect(wrapper.find(PaymentsForm).length).toBe(1);
  });

  it('should have a payment details component', () => {
    expect(wrapper.find(PaymentDetails).length).toBe(0);
  });

  it('should have a customer sucess component', () => {
    expect(wrapper.find(CustomerSuccess).length).toBe(0);
  });

  describe('with no tosAccepted', () => {
    let wrapper;

    beforeEach(() => {
      const props = {
        identity: {
        },
        stripe: {
          validatedCardData: true
        },
        customer: {
          tosAccepted: false
        }
      };
      wrapper = shallow(<AddCard { ...props }/>);
    });

    it('should not have a payment details component', () => {
      expect(wrapper.find(PaymentDetails).length).toBe(0);
    });

    it('should not have a CustomerSuccess component', () => {
      expect(wrapper.find(CustomerSuccess).length).toBe(0);
    });
  });
});

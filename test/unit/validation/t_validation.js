import expect from 'expect';

import { validateNonEmpty, validateCardNumber, validateExpiry, validateCVC } from '../../../src/validation';

describe('validation', () => {

  describe('validateNonEmpty', () => {
    it('should return true if passed a non empty value', () => {
      expect(validateNonEmpty('non empty value')).toBe(true);
    });

    it('should return false if passed an empty string', () => {
      expect(validateNonEmpty('')).toBe(false);
    });

    it('should return false if passed a falsy value', () => {
      expect(validateNonEmpty(null)).toBe(false);
    });

    it('should return false if passed a string containing just a whitespace', () => {
      expect(validateNonEmpty('  \t\n ')).toBe(false);
    });
  });

  // we use Stripe.js implementation, so no need to test results
  describe('validateCardNumber', () => {
    it('should be a function', () => {
      expect(validateCardNumber).toBeA('function');
    });
  });

  describe('validateExpiry', () => {
    it('should be a function', () => {
      expect(validateExpiry).toBeA('function');
    });
  });

  describe('validateCVC', () => {
    it('should be a function', () => {
      expect(validateCVC).toBeA('function');
    });
  });

});

import expect from 'expect';
import { validateNonEmpty } from '../../../src/validation';

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


});

import expect from 'expect';
import reducer from '../../../src/redux/auth';
import { login } from '../../../src/redux/auth';

describe('The "login" authentication action', () => {
  it('should create an action to log in', () => {
    expect(login()).toEqual({ type: 'auth/COMPLETE_LOGIN' });
  });
});

describe('The authentication reducer', () => {
  it('should return the initial state by default', () => {
    expect(reducer(undefined)).toEqual({
      loggedIn: false
    });
  });

  it('should handle a COMPLETE_LOGIN action', () => {
    expect(reducer(undefined, { type: 'auth/COMPLETE_LOGIN' })).toEqual({
      loggedIn: true
    });
  });
});

import expect from 'expect';

import { identity } from '../../../src/reducers/identity';

describe('identity reducers', () => {
  it('should return the initial state', () => {
    expect(identity(undefined, {})).toEqual({
      isAuthenticated: false,
      isDev: false,
      name: undefined,
      errors: null
    });
  });
});

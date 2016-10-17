import expect from 'expect';

import { identity } from '../../../../../src/common/reducers/identity';

describe('identity reducers', () => {
  it('should default to default state', () => {
    expect(identity(undefined, {})).toEqual({
      isAuthenticated: false,
      name: null,
      email: null
    });
  });
});

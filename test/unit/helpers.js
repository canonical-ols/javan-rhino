import expect from 'expect';

// Custom assertions
expect.extend({
  toHaveActionOfType(expected) {
    expect.assert(
      this.actual.filter((action) => {
        return action.type === expected;
      }).length > 0,
      'to have action %s',
      expected
    );

    return this;
  }
});

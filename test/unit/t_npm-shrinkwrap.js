import expect from 'expect';

import shrinkwrap from '../../npm-shrinkwrap.json';

describe('npm-shrinkwrap', () => {
  describe('modules', () => {
    it('should not include fsevents', () => {
      expect(deepFind(shrinkwrap.dependencies, 'fsevents')).toBe(false);
    });
    it('should not include resolved fields', () => {
      expect(deepFind(shrinkwrap.dependencies, 'resolved')).toBe(false);
    });
  });
});
describe('deepFind', () => {
  const fixture = {
    foo: 'abc',
    bar: 'def',
    baz: {
      qux: 'ghi'
    }
  };
  it('should find keys', () => {
    expect(deepFind(fixture, 'foo')).toBe(true);
  });
  it('should not find values', () => {
    expect(deepFind(fixture, 'abc')).toBe(false);
  });
  it('should find nested keys', () => {
    expect(deepFind(fixture, 'qux')).toBe(true);
  });
});

function deepFind(haystack, needle) {
  if (haystack[needle]) {
    return true;
  }

  const keys = Object.keys(haystack)

  let result = false;

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let sheaf = haystack[key];

    if (sheaf.dependencies) {
      console.log(sheaf.dependencies[needle]);
      result = deepFind(sheaf.dependencies, needle);

      if (result) break;

    }
  }

  return result;
}

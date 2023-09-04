import removeNilKeys, { removeNilKeysImultable } from '.';

describe('removeNilKeys', () => {
  it('should remove keys with falsy values', () => {
    const inputObject = {
      a: 42,
      b: '',
      c: null,
      d: undefined,
      e: 0,
      f: 'hello',
      g: false
    };

    removeNilKeys(inputObject);

    expect(inputObject).toEqual({
      a: 42,
      b: '',
      e: 0,
      f: 'hello',
      g: false
    });
  });

  it('should handle an empty object', () => {
    const inputObject = {};

    removeNilKeys(inputObject);

    expect(inputObject).toEqual({});
  });

  it('should handle an object with no falsy values', () => {
    const inputObject = {
      a: 42,
      b: 'hello',
      c: { nested: 'value' }
    };

    removeNilKeys(inputObject);

    expect(inputObject).toEqual({
      a: 42,
      b: 'hello',
      c: { nested: 'value' }
    });
  });
});

describe('removeNilKeysImultable', () => {
  it('should remove keys with falsy values - Imultable', () => {
    const inputObject = {
      a: 42,
      b: '',
      c: null,
      d: undefined,
      e: 0,
      f: 'hello'
    };
    const shallowCopy = { ...inputObject };

    const newObj = removeNilKeysImultable(inputObject);

    expect(shallowCopy).toEqual(inputObject);

    expect(newObj).toEqual({
      a: 42,
      b: '',
      e: 0,
      f: 'hello'
    });
  });
});

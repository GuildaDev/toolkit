import removeFalsyKeys, { removeFalsyKeysImut } from '.';

describe('removeFalsyKeys', () => {
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

    removeFalsyKeys(inputObject);

    expect(inputObject).toEqual({
      a: 42,
      f: 'hello'
    });
  });

  it('should handle an empty object', () => {
    const inputObject = {};

    removeFalsyKeys(inputObject);

    expect(inputObject).toEqual({});
  });

  it('should handle an object with no falsy values', () => {
    const inputObject = {
      a: 42,
      b: 'hello',
      c: { nested: 'value' }
    };

    removeFalsyKeys(inputObject);

    expect(inputObject).toEqual({
      a: 42,
      b: 'hello',
      c: { nested: 'value' }
    });
  });
});

describe('removeFalsyKeysImut', () => {
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

    const newObj = removeFalsyKeysImut(inputObject);

    expect(inputObject).toEqual(inputObject);
    expect(newObj).toEqual({
      a: 42,
      f: 'hello'
    });
  });
});

import removeFalsyKeys from '.'

describe('removeFalsyKeys', () => {
  it('should remove keys with falsy values', () => {
    const inputObject = {
      a: 42,
      b: '',
      c: null,
      d: undefined,
      e: 0,
      f: 'hello',
    }

    removeFalsyKeys(inputObject)

    expect(inputObject).toEqual({
      a: 42,
      f: 'hello',
    })
  })

  it('should handle an empty object', () => {
    const inputObject = {}

    removeFalsyKeys(inputObject)

    expect(inputObject).toEqual({})
  })

  it('should handle an object with no falsy values', () => {
    const inputObject = {
      a: 42,
      b: 'hello',
      c: { nested: 'value' },
    }

    removeFalsyKeys(inputObject)

    expect(inputObject).toEqual({
      a: 42,
      b: 'hello',
      c: { nested: 'value' },
    })
  })
})

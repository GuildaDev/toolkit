# Introduction

This package provides a function to remove nil keys from a map.

# Usage

```ts
import removeNilKeys from '@guildadev/remove-nil-keys';

const inputObject = {
  a: 42,
  b: '',
  c: null,
  d: undefined,
  e: 0,
  f: 'hello',
  g: false,
};

removeNilKeys(inputObject); // {  a: 42, b: '', e: 0, f: 'hello', g: false }
```

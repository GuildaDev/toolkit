# Introduction

This package provides a function to remove nil keys from a map.

# Installation

´´´bash
yarn add @guidadev/remove-nil-keys
´´´

or

´´´bash
npm install @guidadev/remove-nil-keys
´´´

# Usage

Here's how you can start using @guidadev/remove-nil-keys in your projects:

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

You can also use imutable version of this function:

```typescript
import { removeNilKeysImultable } from '@guidadev/remove-falsy-keys';

const inputObject = {
  a: 42,
  b: '',
  c: null,
  d: undefined,
  e: 0,
  f: 'hello',
  g: false,
};

const data = removeNilKeysImultable(inputObject); // {  a: 42, b: '', e: 0, f: 'hello', g: false }
```

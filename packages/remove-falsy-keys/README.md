# Introduction

This package is a helper for cleaning up objects by removing falsy keys.

# Installation

´´´bash
yarn add @guidadev/remove-falsy-keys
´´´

or

´´´bash
npm install @guidadev/remove-falsy-keys
´´´

# Usage

Here's how you can start using @guidadev/remove-falsy-keys in your projects:

```typescript
import removeFalsyKeys from '@guidadev/remove-falsy-keys';

const inputObject = {
  a: 42,
  b: '',
  c: null,
  d: undefined,
  e: 0,
  f: 'hello',
};

removeFalsyKeys(inputObject); // { a: 42, f: 'hello' }
```

You can also use imutable version of this function:

```typescript
import { removeFalsyKeysImultable } from '@guidadev/remove-falsy-keys';

const inputObject = {
  a: 42,
  b: '',
  c: null,
  d: undefined,
  e: 0,
  f: 'hello',
};

const data = removeFalsyKeysImultable(inputObject); // { a: 42, f: 'hello' }
```

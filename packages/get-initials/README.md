# Introduction

This package provides a function to remove nil keys from a map.

# Installation

´´´bash
yarn add @guidadev/get-initials
´´´

or

´´´bash
npm install @guidadev/get-initials
´´´

# Usage

Here's how you can start using @guidadev/get-initials in your projects:

```ts
import removeNilKeys from '@guildadev/get-initials';

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
import { removeNilKeysImultable } from '@guidadev/get-initials';

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

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
import getInitials from '@guildadev/get-initials';

const someNull = null
const someUndefined = undefined

getInitials('Guilda Dev') // GD
getInitials(someNull, 'GD') // GD
getInitials(someUndefined, 'GD') // GD
```

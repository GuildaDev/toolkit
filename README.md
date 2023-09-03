# Introduction

`@guidadev/core-utils` is a JavaScript utility library inspired by popular libraries like Ramda and lodash. It is designed to simplify common programming tasks, making your daily development tasks more efficient and enjoyable. This library provides a collection of functions and utilities that can help you manipulate data, perform functional programming operations, and streamline your JavaScript code.

# Installation

Not available yet

# Usage

Here's how you can start using @guidadev/core-utils in your projects:

```typescript
import removeFalsyKeys from '@guidadev/core-utils/removeFalsyKeys'

// or if you want just this package
// import removeFalsyKeys from '@guidadev/removeFalsyKeys'

 
const inputObject = {
      a: 42,
      b: '',
      c: null,
      d: undefined,
      e: 0,
      f: 'hello',
    }

removeFalsyKeys(inputObject) // { a: 42, f: 'hello' }
```

# Features

Not available yet

# Contributing

We welcome contributions from the community. If you have an idea for a new utility function or an improvement to an existing one, please open an issue or submit a pull request on our GitHub repository.

# License

@guidadev/core-utils is released under the MIT License. Feel free to use it in your projects, and contributions are always welcome!

# Credits

@guidadev/core-utils is developed and maintained by the GuidaDev team. We are grateful to the open-source community and the creators of Ramda and lodash for inspiring this library.





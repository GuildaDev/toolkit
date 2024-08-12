# Introduction

The package leverages the best of metaprogramming, allowing direct access to data through an abstract model that represents a database table.

See [.docs/motivation.md](.docs/motivation.md)

# Installation

´´´bash
yarn add @guidadev/jsonapi-to-model
´´´

or

´´´bash
npm install @guidadev/jsonapi-to-model
´´´

# Usage

Here's how you can start using @guidadev/jsonapi-to-model in your projects:

```ts
import { BaseEntity, Entity, Attribute } from '@guildadev/jsonapi-to-model';


const response = fetch('/my-awesome-api/user')

// Response
// {
//     data: {
//     type: "user",
//     id: "1",
//     attributes: {
//         name: 'Alekinho',
//         email: 'alekito@email.com',
//       },
//     },
// }


class User extends BaseEntity {
  @Attribute()
  name!: string;

  @Attribute()
  email!: string;
}

const user = new User(response)

user.name // Alekinho
user.email // alekito@email.com
```

You can also get metas, array of JSON:API, object member metas

Check more on: [model-object.test.ts](./tests/model-object.test.ts) and [model-arrays.test.ts](./tests/model-arrays.test.ts)


# References:

https://www.typescriptlang.org/docs/handbook/decorators.html

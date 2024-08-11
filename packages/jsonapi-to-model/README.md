# Introduction


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

@Entity()
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

References:

https://www.typescriptlang.org/docs/handbook/decorators.html

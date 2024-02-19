# Introduction


# Installation

´´´bash
yarn add @guidadev/deserialize-jsonapi
´´´

or

´´´bash
npm install @guidadev/deserialize-jsonapi
´´´

# Usage

Here's how you can start using @guidadev/deserialize-jsonapi in your projects:

```ts
import { BaseEntity, Entity, Attribute } from '@guildadev/deserialize-jsonapi';


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

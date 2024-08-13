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
// model/User.ts
import { Attribute, BaseEntity } from "@guildadev/jsonapi-to-model";

export class User extends BaseEntity {
  @Attribute()
  declare name: string;
}

// services/users.ts
export function useUsersQuery() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const request = await api.get('/user')
      const data = request.data
      const user = new User(data);

      return user;
    },
  });
}

export function useUserQuery() {
  return useQuery<User>({
    queryKey: ["user", 1],
    queryFn: async () => {
      const request = await api.get('/user/1')
      const data = request.data
      const user = new User(data);

      return user;
    },
  });
}



// Component.tsx
import { useUserQuery } from "@/provider/useUserQuery";

export default function Hello() {
    const { data: user, isLoading } = useUserQuery();
  
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!user) {
        return <div>User not found</div>;
    }
  
    return <div>Hello, {user.name} </div>;
}
```

in tsconfig, inside compilerOptions, you need add:

```json
{
  "experimentalDecorators": true,
  "useDefineForClassFields": true
}
```

Check how we are using in React, NextJS and Angular: https://github.com/GuildaDev/jsonapi-to-model-apps-demo

You can also get metas, array of JSON:API, object member metas

Check more on: [model-object.test.ts](./tests/model-object.test.ts) and [model-arrays.test.ts](./tests/model-arrays.test.ts)

# Limitations

Even though esbuild and Vite 5 allow the use of experimentalDecorators (without reflection support), SWC does not support this feature. To work around this limitation in SWC, you can use internal helpers.

See [limitations](./.docs/limitations.md)

# References:

https://www.typescriptlang.org/docs/handbook/decorators.html

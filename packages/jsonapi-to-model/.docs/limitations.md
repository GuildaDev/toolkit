
# Vite + SWC does not support decorators

You can follow many threads explaining about that.

But you can use the solution without decorators.

```tsx
import { BaseEntity } from "@guildadev/jsonapi-to-model";

export class User extends BaseEntity {
  get name() {
    return this.getAttribute("name");
  }
}
```

You can check the preview link on README.md

### References

https://github.com/vitejs/vite/issues/15565

https://github.com/evanw/esbuild/issues/257#issuecomment-658053616

https://github.com/vitejs/vite/issues/4884#issuecomment-915959878

https://vitejs.dev/guide/migration#update-experimentaldecorators-and-usedefineforclassfields-typescript-behaviour

https://github.com/dkent600/douglaskent/commit/a73a3ec9b75122e074ef555606fff2e2fed6672c#diff-6a3b01ba97829c9566ef2d8dc466ffcffb4bdac08706d3d6319e42e0aa6890dd
# Contribute

- Open Issue or Discussion about the feature you want to add
- Fork the repository
- Create a branch with the name of the feature
- Make your changes
- Open a Pull Request

# Creating a new package

```bash
npx nx generate @nx/js:lib
```

Choose

```bash
Which bundler would you like to use to build the library? Choose 'none' to skip build setup. …
swc
tsc
rollup
vite
esbuild
none
```

Choose Derived

```bash
What should be the project name and where should it be generated? …
Derived:
    Name: remove-nil-keys
    Root: packages/remove-nil-keys
```

If you are creating a new package, you need to change 2 things:

1 - package.json

```json
{
  "name": "@guildadev/your-package-name",
  "version": "1.0.0",
  "dependencies": {},
  "type": "module",
  "typings": "./src/index.d.ts",
  "exports": {
    ".": {
      "import": "./index.js",
      "require": "./index.cjs"
    }
  }
}
```

2 - project.json

a - change build command name to bundler

```bash
"targets": {
    "bundler": { // change here
      "executor": "@nx/esbuild:esbuild",
```

b - after bundler add this

```bash
"build": {
      "executor": "nx:run-commands",
      "options": {
        "command": "tsc -p packages/your-package-name/tsconfig.lib.json --emitDeclarationOnly --outDir ./dist"
      },
      "dependsOn": [
        {
          "projects": "self",
          "target": "bundler"
        }
      ]
    },
```

# References

https://nx.dev/packages/js

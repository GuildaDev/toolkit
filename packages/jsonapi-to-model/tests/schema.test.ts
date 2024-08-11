class Base {
  constructor() {
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#the-usedefineforclassfields-flag-and-the-declare-property-modifier
    Object.defineProperty(this, "name", {
      get: function () {
        return "hello";
      },
      configurable: true,
      enumerable: true,
    });
  }
}

class User extends Base {
  declare name: string;
}

it("Should get attributes extending BaseEntity", () => {
  const user = new User();
  expect(user.name).toBe("hello");
});

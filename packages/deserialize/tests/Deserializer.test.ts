import { Attribute, BaseEntity, Entity } from "../src";
import { faker } from "@faker-js/faker";

@Entity()
class User extends BaseEntity {
  @Attribute()
  name!: string;

  @Attribute()
  email!: string;
}

describe("Deserialize", () => {
  it("Should deserialize simple attributes", () => {
    const payload = {
      data: {
        type: "user",
        id: "1",
        attributes: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
        },
      },
    };

    const user = new User(payload);
    expect(user.name).toBe(payload.data.attributes.name);
    expect(user.email).toBe(payload.data.attributes.email);
  });
});

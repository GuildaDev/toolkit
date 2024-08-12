import { ArrayMeta, Attribute, BaseEntity, Included, Meta } from "../src";
import jsonapiObject from "./fixtures/jsonapi-array-data.json";

class User extends BaseEntity {
  @Attribute()
  declare firstName: string;

  @Attribute()
  declare lastName: string;

  @Attribute()
  declare email: string;

  @Attribute()
  declare username: string;

  @Included()
  declare photos: Array<unknown>;

  @Included()
  declare addresses: Array<unknown>;

  @Meta()
  declare admin: boolean;

  @ArrayMeta()
  declare total: number;

  @ArrayMeta("total_photos")
  declare photos_quantity: number;
}

describe("Article Model", () => {
  it("Should get attributes from array of users", () => {
    const users = new User(jsonapiObject);
    let user = users.all[0];

    expect(user.firstName).toBe("John");
    expect(user.lastName).toBe("Doe");
    expect(user.email).toBe("john.doe@example.com");
    expect(user.username).toBe("johndoe");
    expect(user.photos).toHaveLength(2);
    expect(user.addresses).toHaveLength(2);

    user = users.all[1];
    expect(user.firstName).toBe("Jane");
    expect(user.lastName).toBe("Smith");
    expect(user.email).toBe("jane.smith@example.com");
    expect(user.username).toBe("janesmith");
    expect(user.photos).toHaveLength(1);
    expect(user.addresses).toHaveLength(2);
  });

  it("Should get meta of array", () => {
    const users = new User(jsonapiObject);

    expect(users.total).toBe(2);
    expect(users.photos_quantity).toBe(3);
  });

  it("Should get meta of object member", () => {
    const users = new User(jsonapiObject);

    expect(users.all[0].admin).toBe(true);
    expect(users.all[1].admin).toBe(false);
  });

  it("Should not show main meta on object", () => {
    const users = new User(jsonapiObject);

    expect(users.all[0].photos_quantity).toBeUndefined();
  });
});

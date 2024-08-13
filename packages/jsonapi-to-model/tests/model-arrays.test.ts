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

  @Included("address")
  declare addresses: Array<unknown>;

  @Meta()
  declare admin: boolean;

  @ArrayMeta()
  declare total: number;

  @ArrayMeta("total_photos")
  declare photos_quantity: number;

  get raw_custom() {
    return this.raw;
  }
}

describe("Article Model", () => {
  it("Should get attributes from array of users", () => {
    const users = new User(jsonapiObject);
    let user = users.all[0];

    expect(user.firstName).toBe("John");
    expect(user.lastName).toBe("Doe");
    expect(user.email).toBe("john.doe@example.com");
    expect(user.username).toBe("johndoe");

    user = users.all[1];
    expect(user.firstName).toBe("Jane");
    expect(user.lastName).toBe("Smith");
    expect(user.email).toBe("jane.smith@example.com");
    expect(user.username).toBe("janesmith");
  });

  it("Should get only associated addresses", () => {
    const users = new User(jsonapiObject);
    const user = users.all[0];
    expect(user.addresses).toHaveLength(1);

    const user_b = users.all[1];
    expect(user_b.addresses).toHaveLength(1);
  });

  it("Should get only associated photos", () => {
    const users = new User(jsonapiObject);
    const user = users.all[0];
    expect(user.photos).toHaveLength(2);

    const user_b = users.all[1];
    expect(user_b.photos).toHaveLength(1);
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

  it("Should information by using at", () => {
    const users = new User(jsonapiObject);

    expect(users.at(0)?.firstName).toBe("John");
  });

  it("Should get raw", () => {
    const users = new User(jsonapiObject);

    expect(users.raw).toBe(jsonapiObject);
    expect(users.raw_custom).toBe(jsonapiObject);
  });
});

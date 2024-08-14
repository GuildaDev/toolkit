import {
  ArrayMeta,
  Attribute,
  BaseEntity,
  Included,
  Links,
  Meta,
} from "../src";
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
  declare photos: Array<any>;

  @Included()
  declare cover: Array<any>;

  @Included("address")
  declare addresses: Array<unknown>;

  @Links()
  declare self: string;

  @Meta()
  declare admin: boolean;

  @ArrayMeta()
  declare total: number;

  @ArrayMeta("total_photos")
  declare photos_quantity: number;

  get raw_custom() {
    return this.raw;
  }

  get covers() {
    return this.find_included_by<{ links: { photo_url: string } }>(
      "cover_photo",
    );
  }

  get photo_url() {
    return this.covers?.at(0)?.links?.photo_url;
  }

  get link_self() {
    return this.getAssociationsLinked("self");
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

  it("Should get attribute of association", () => {
    const users = new User(jsonapiObject);
    const user = users.at(0);
    expect(user?.photos.at(0).attributes.url).toBe(
      "http://example.com/photos/1.jpg",
    );
  });

  it("Should get link of association", () => {
    const users = new User(jsonapiObject);
    const user = users.at(0);
    expect(user?.cover.at(0).links.photo_url).toBe(
      "https://generate.cloud/cdn-cgi/imagedelivery/6G1N-_IOty0Iv_mKdGmX1w/c2d7c764-ae8d-4b4e-a25f-97058c89e200",
    );
  });

  it("Should jsonapi links", () => {
    const users = new User(jsonapiObject);
    expect(users.self).toBe("http://example.com/articles/1");
  });

  it("Should jsonapi links via getter", () => {
    const users = new User(jsonapiObject);
    expect(users.link_self).toBe("http://example.com/articles/1");
  });

  it("Should get data by searching manual in included", () => {
    const users = new User(jsonapiObject);
    const user = users.at(0);

    expect(user?.photo_url).toBe(
      "https://generate.cloud/cdn-cgi/imagedelivery/6G1N-_IOty0Iv_mKdGmX1w/c2d7c764-ae8d-4b4e-a25f-97058c89e200",
    );
  });

  // it("Should get data all covers getting manual", () => {
  //   const users = new User(jsonapiObject);
  //   const cover = users.covers_included[0];
  //   expect(cover.attributes.main).toBeTruthy();
  // });

  it("Should prevent error getting data by searching manual in included from array", () => {
    const users = new User(jsonapiObject);

    expect(users?.photo_url).toBe(users.at(0)?.photo_url);
  });
});

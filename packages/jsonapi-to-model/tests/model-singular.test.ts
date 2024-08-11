import { Attribute, BaseEntity, Included, Meta } from "../src";
import jsonapiObject from "./fixtures/jsonapi-object-data.json";

class Article extends BaseEntity {
  @Attribute()
  declare title: string;

  @Attribute("views_quantity")
  declare views: number;

  @Meta()
  declare rating: number;

  @Included()
  declare comments: Array<unknown>;
}

describe("Article Model", () => {
  it("Should get attributes", () => {
    const article = new Article(jsonapiObject);

    expect(article.title).toBe("JSON:API paints my bikeshed!");
  });

  it("Should allow rename key getter", () => {
    const article = new Article(jsonapiObject);

    expect(article.views).toBe(1234);
  });

  it("Should get meta from object", () => {
    const article = new Article(jsonapiObject);

    expect(article.rating).toBe(4.5);
  });

  it("Should get meta from object", () => {
    const article = new Article(jsonapiObject);

    expect(article.comments.length).toBe(2);
  });
});

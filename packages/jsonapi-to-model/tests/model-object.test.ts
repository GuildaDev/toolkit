import { Attribute, BaseEntity, Included, Links, Meta } from "../src";
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

  @Links()
  declare self: string;

  get raw_custom() {
    return this.raw;
  }

  get titleWithoutDecorator() {
    return this.getAttribute("title");
  }

  get metaWithoutDecorator() {
    return this.getMetaAttribute("rating");
  }
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

  it("Should get raw", () => {
    const article = new Article(jsonapiObject);

    expect(article.raw).toBe(jsonapiObject);
    expect(article.raw_custom).toBe(jsonapiObject);
  });

  it("Should get attribute without decorator", () => {
    const article = new Article(jsonapiObject);

    expect(article.titleWithoutDecorator).toBe("JSON:API paints my bikeshed!");
  });

  it("Should get meta without decorator", () => {
    const article = new Article(jsonapiObject);

    expect(article.metaWithoutDecorator).toBe(4.5);
  });

  it("Should allow use at", () => {
    const article = new Article(jsonapiObject);

    expect(article.at(0)?.views).toBe(1234);
  });

  it("Should prevent error using at on object", () => {
    const article = new Article(jsonapiObject);

    expect(article.at(1)).toBeNull();
  });

  it("Should get links ", () => {
    const article = new Article(jsonapiObject);

    expect(article.self).toBe("http://example.com/articles");
  });
});

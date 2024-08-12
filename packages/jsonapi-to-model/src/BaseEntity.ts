import {
  ATTRIBUTE_METADATA_KEY,
  INCLUDED_METADATA_KEY,
  kClassMapping,
  METAS_METADATA_KEY,
} from "./symbols";
import { AttributeReflector } from "./types";

export class BaseEntity {
  #rawPayload: any;

  constructor(payload: any) {
    this.#rawPayload = payload;

    const properties = Object.getPrototypeOf(this)[kClassMapping];

    properties.forEach(
      ({ originaKey, mapperKey, kind }: AttributeReflector) => {
        Object.defineProperty(this, mapperKey, {
          get: () => {
            return this.getDataByKind(kind, originaKey);
          },
          configurable: true,
          enumerable: true,
        });
      },
    );
  }

  private getDataByKind(kind: symbol, objectKey: string) {
    switch (kind) {
      case ATTRIBUTE_METADATA_KEY:
        return this.getAttribute(objectKey);
      case METAS_METADATA_KEY:
        return this.getMetaAttribute(objectKey);
      case INCLUDED_METADATA_KEY:
        return this.getAssociationsIncluded(objectKey);
      default:
        return null;
    }
  }

  private getAttribute(objectKey: string) {
    if (this.isCollectionMember) {
      return this.#rawPayload.attributes?.[objectKey];
    }
    return this.#rawPayload?.data?.attributes?.[objectKey];
  }

  private getMetaAttribute(objectKey: string) {
    if (this.isCollection || this.isCollectionMember) {
      return this.#rawPayload.meta?.[objectKey];
    }

    return this.#rawPayload?.data?.meta?.[objectKey];
  }

  protected getAssociationsIncluded(
    associationType: string,
    associationIds: string[] = [],
  ) {
    if (this.isCollectionMember) {
      const ids = this.#rawPayload.relationships?.[associationType]?.data.map(
        // @ts-expect-error - we expect array of relationships
        (relation) => relation.id,
      );
      const proto = Object.getPrototypeOf(this);
      return proto.getAssociationsIncluded(associationType, ids);
    }

    const includeds = [];

    for (const included of this.#rawPayload.included) {
      if (
        included.type === associationType &&
        (associationIds.length === 0 || associationIds.includes(included.id))
      ) {
        includeds.push(included);
      }
    }

    return includeds;
  }

  private get isCollectionMember() {
    // eslint-disable-next-line no-prototype-builtins
    return Object(this.#rawPayload || {}).hasOwnProperty("attributes");
  }

  protected get isCollection() {
    return Array.isArray(this.#rawPayload?.data);
  }

  protected rawPayload() {
    return this.#rawPayload;
  }

  get all(): this[] {
    if (this.isCollection) {
      return this.#rawPayload?.data.map((data: any) => {
        // I wanna see you do it in Java
        const instance =
          new (this.constructor as new (payload: unknown) => this)(
            data,
          );
        Object.setPrototypeOf(instance, this);

        return instance;
      }) as this[];
    }

    return [this];
  }
}

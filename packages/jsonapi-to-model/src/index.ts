import {
  ATTRIBUTE_METADATA_KEY,
  INCLUDED_METADATA_KEY,
  kClassMapping,
  METAS_METADATA_KEY,
} from "./symbols";
import { AttributeReflector } from "./types";

export class BaseEntity {
  private _rawPayload: any;

  constructor(payload: any) {
    this._rawPayload = payload;

    const properties = Object.getPrototypeOf(this)[kClassMapping] ?? [];

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

  private getAssociationsIncluded(
    associationType: string,
    associationIds: string[] = [],
  ) {
    if (this.isCollectionMember) {
      let relation_type = "";
      let relations_ids = [];
      const association = Object(
        this._rawPayload.relationships?.[associationType] ?? {},
      );

      if (association.data === undefined) {
        return [];
      }

      if (Array.isArray(association.data)) {
        relation_type = association.data[0].type;
        relations_ids = association.data.map((relation: any) => relation.id);
      } else {
        relation_type = association.data.type;
        relations_ids = [association.data.id];
      }

      const proto = Object.getPrototypeOf(this);
      return proto.getAssociationsIncluded(relation_type, relations_ids);
    }

    const includeds = [];

    for (const included of this._rawPayload.included) {
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
    return Object(this._rawPayload || {}).hasOwnProperty("attributes");
  }

  protected get isCollection() {
    return Array.isArray(this._rawPayload?.data);
  }

  public get all(): this[] {
    if (this.isCollection) {
      return this._rawPayload?.data.map((data: any) => {
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

  public get raw() {
    return this._rawPayload;
  }

  public getAttribute(objectKey: string) {
    if (this.isCollectionMember) {
      return this._rawPayload.attributes?.[objectKey];
    }
    return this._rawPayload?.data?.attributes?.[objectKey];
  }

  public getMetaAttribute(objectKey: string) {
    if (this.isCollection || this.isCollectionMember) {
      return this._rawPayload.meta?.[objectKey];
    }

    return this._rawPayload?.data?.meta?.[objectKey];
  }
}

export { Attribute } from "./decorators/Attributes";
export { Meta } from "./decorators/Metas";
export { Included } from "./decorators/Included";
export { ArrayMeta } from "./decorators/ArrayMetas";

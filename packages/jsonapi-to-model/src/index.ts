import {
  ATTRIBUTE_METADATA_KEY,
  INCLUDED_LINKS_METADATA_KEY,
  INCLUDED_METADATA_KEY,
  kClassMapping,
  LINKS_METADATA_KEY,
  METAS_METADATA_KEY,
} from "./symbols";
import { AttributeReflector } from "./types";

export class BaseEntity {
  private _rawPayload: any;

  constructor(payload: any) {
    this._rawPayload = payload;

    const properties = Object.getPrototypeOf(this)[kClassMapping] ?? [];

    properties.forEach(
      (
        { originaKey, mapperKey, kind, includedAssociation }:
          AttributeReflector,
      ) => {
        Object.defineProperty(this, mapperKey, {
          get: () => {
            return this.getDataByKind(kind, originaKey, includedAssociation);
          },
          configurable: true,
          enumerable: true,
        });
      },
    );
  }

  // ============
  // protected API
  // ============

  protected get isCollection() {
    return Array.isArray(this._rawPayload?.data);
  }

  // ============
  // private API
  // ============

  private getDataByKind(
    kind: symbol,
    objectKey: string,
    includedAssociation?: string,
  ) {
    switch (kind) {
      case ATTRIBUTE_METADATA_KEY:
        return this.getAttribute(objectKey);
      case METAS_METADATA_KEY:
        return this.getMetaAttribute(objectKey);
      case INCLUDED_METADATA_KEY:
        return this.getAssociationsIncluded(objectKey);
      case LINKS_METADATA_KEY:
        return this.getAssociationsLinked(objectKey);
      case INCLUDED_LINKS_METADATA_KEY:
        return this.getAssociationsIncludedLinked(
          includedAssociation || "",
          objectKey,
        );
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

  private getAssociationsIncludedLinked(
    includedAssociation: string,
    associationType: string,
  ) {
    return this.getAssociationsIncluded(includedAssociation, []).map(
      (item: any) => item.links?.[associationType],
    ).at(0);
  }

  private getAssociationsLinked(associationType: string) {
    return this._rawPayload.links?.[associationType];
  }

  private get isCollectionMember() {
    // eslint-disable-next-line no-prototype-builtins
    return Object(this._rawPayload || {}).hasOwnProperty("attributes");
  }

  private constructorBuilder(collection_object: any) {
    // I wanna see you do it in Java
    const instance = new (this.constructor as new (payload: unknown) => this)(
      collection_object,
    );
    Object.setPrototypeOf(instance, this);

    return instance;
  }

  // ============
  // Public API
  // ============

  public get all(): this[] {
    if (this.isCollection) {
      return this._rawPayload?.data.map((item: any) =>
        this.constructorBuilder(item)
      ) as this[];
    }

    return [this];
  }

  public at(index: number): this | null {
    if (this.isCollection) {
      return this.constructorBuilder(this._rawPayload?.data[index]);
    } else if (!this.isCollection && index === 0) {
      return this;
    }

    return null;
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

  public find_included_by<T = any>(
    type: string,
  ): T[] {
    if (!this.isCollectionMember) {
      return this.getAssociationsIncluded(type, []) ?? [];
    }

    let relation_type = "";

    for (const key in this._rawPayload.relationships) {
      if (this._rawPayload.relationships[key].data.type === type) {
        relation_type = key;
        break;
      }
    }

    if (!relation_type) {
      return [];
    }
    const relationship_id =
      this._rawPayload.relationships[relation_type].data.id;

    const result =
      this.getAssociationsIncluded(relation_type, [relationship_id]) ?? [];
    return result.at(0);
  }
}

export { Attribute } from "./decorators/Attributes";
export { Meta } from "./decorators/Metas";
export { Included } from "./decorators/Included";
export { ArrayMeta } from "./decorators/ArrayMetas";
export { Links } from "./decorators/Linked";

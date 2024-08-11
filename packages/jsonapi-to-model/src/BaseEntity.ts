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

  getDataByKind(kind: symbol, objectKey: string) {
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

  getAttribute(objectKey: string) {
    return this._rawPayload?.data?.attributes?.[objectKey];
  }

  getMetaAttribute(objectKey: string) {
    return this._rawPayload?.data?.meta?.[objectKey];
  }

  getAssociationsIncluded(associationType: string) {
    return this._rawPayload?.included?.filter(
      (included: { type: string }) => included.type === associationType,
    ) || [];
  }
}

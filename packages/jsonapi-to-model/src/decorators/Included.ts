import "reflect-metadata";
import { INCLUDED_METADATA_KEY, kClassMapping } from "../symbols";

export function Included(attributeKey?: string) {
  return function (target: any, mapperKey: string | symbol) {
    const originaKey = attributeKey || mapperKey;

    // eslint-disable-next-line no-prototype-builtins
    if (!target.hasOwnProperty(kClassMapping)) {
      target[kClassMapping] = [];
    }

    target[kClassMapping].push({
      originaKey,
      mapperKey,
      kind: INCLUDED_METADATA_KEY,
    });
  };
}

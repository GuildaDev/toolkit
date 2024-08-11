import "reflect-metadata";
import { kClassMapping, METAS_METADATA_KEY } from "../symbols";

export function Meta(metaKey?: string) {
  return function (target: any, mapperKey: string | symbol) {
    const originaKey = metaKey || mapperKey;

    // eslint-disable-next-line no-prototype-builtins
    if (!target.hasOwnProperty(kClassMapping)) {
      target[kClassMapping] = [];
    }

    target[kClassMapping].push({
      originaKey,
      mapperKey: mapperKey,
      kind: METAS_METADATA_KEY,
    });
  };
}

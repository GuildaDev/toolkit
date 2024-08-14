import { kClassMapping, LINKS_METADATA_KEY } from "../symbols";

export function Links(metaKey?: string) {
  return function (target: any, mapperKey: string | symbol) {
    const originaKey = metaKey || mapperKey;

    // eslint-disable-next-line no-prototype-builtins
    if (!target.hasOwnProperty(kClassMapping)) {
      target[kClassMapping] = [];
    }

    target[kClassMapping].push({
      originaKey,
      mapperKey: mapperKey,
      kind: LINKS_METADATA_KEY,
    });
  };
}

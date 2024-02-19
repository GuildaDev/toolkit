import { kAttributes, kData } from "../symbols";
import deserialize from "../util/jsonapi";

export function Entity() {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super();
        // @ts-expect-error
        this[kData] = deserialize(args[0])["data"];

        // @ts-expect-error
        this[kAttributes]?.forEach((attr: any) => attr.apply(this));
      }
    };
  };
}

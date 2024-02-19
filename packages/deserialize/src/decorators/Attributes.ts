import { kAttributes, kData } from "../symbols";

export function Attribute() {
  return function (target: any, propertyKey: string | symbol) {
    if (target[kAttributes] === undefined) {
      target[kAttributes] = [];
    }

    target[kAttributes].push({
      propertyKey,
      apply: (instance: any) => {
        instance[propertyKey] = instance[kData][propertyKey];
      },
    });
  };
}

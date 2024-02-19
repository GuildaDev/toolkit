import deserialize from "./util/jsonapi";

export class Deserializer<T extends any> {
  private _raw: any;

  constructor(private ClassType: new (data: any) => T, data: any) {
    this._raw = deserialize(data);
    new this.ClassType(this._raw.data);
  }
}

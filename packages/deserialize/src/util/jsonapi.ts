// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import * as deserializeJsonApi from "deserialize-json-api";

export interface IDeserializedPayload<T = any> {
  data: T;
}

export default function deserialize<T = any>(
  payload: T,
) {
  return deserializeJsonApi.deserialize(payload);
}

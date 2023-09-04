export type RemoveFalsyKeysProps = {
  [key: string]: unknown;
};

export default function removeFalsyKeys(newLocalData: RemoveFalsyKeysProps) {
  Object.keys(newLocalData).forEach((key) => {
    if (!newLocalData[key]) {
      delete newLocalData[key];
    }
  });

  return newLocalData;
}

export function removeFalsyKeysImultable(newLocalData: RemoveFalsyKeysProps) {
  const newObject = Object.assign({}, newLocalData);
  removeFalsyKeys(newObject);

  return newObject;
}

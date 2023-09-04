export type removeNilKeysProps = {
  [key: string]: unknown;
};

export default function removeNilKeys(newLocalData: removeNilKeysProps) {
  Object.keys(newLocalData).forEach((key) => {
    if (
      !newLocalData[key] &&
      newLocalData[key] !== 0 &&
      newLocalData[key] !== false &&
      newLocalData[key] !== ''
    ) {
      delete newLocalData[key];
    }
  });

  return newLocalData;
}

export function removeNilKeysImultable(newLocalData: removeNilKeysProps) {
  const newObject = Object.assign({}, newLocalData);
  removeNilKeys(newObject);

  return newObject;
}

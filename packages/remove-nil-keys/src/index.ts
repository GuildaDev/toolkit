import { RemoveNilKeysProps } from './types';

export default function removeNilKeys(newLocalData: RemoveNilKeysProps) {
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

export function removeNilKeysImut(newLocalData: RemoveNilKeysProps) {
  const newLocalDataCopy = Object.assign({}, newLocalData);
  removeNilKeys(newLocalDataCopy);

  return newLocalDataCopy;
}

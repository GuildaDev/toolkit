import { RemoveFalsyKeysProps } from './types';

export default function removeFalsyKeys(newLocalData: RemoveFalsyKeysProps) {
  Object.keys(newLocalData).forEach((key) => {
    if (!newLocalData[key]) {
      delete newLocalData[key];
    }
  });

  return newLocalData;
}

export function removeFalsyKeysImut(newLocalData: RemoveFalsyKeysProps) {
  const newLocalDataCopy = Object.assign({}, newLocalData);
  removeFalsyKeys(newLocalDataCopy);

  return newLocalDataCopy;
}

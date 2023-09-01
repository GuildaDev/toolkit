export type RemoveFalsyKeysProps = {
  [key: string]: unknown
}

export default function removeFalsyKeys(newLocalData: RemoveFalsyKeysProps) {
  Object.keys(newLocalData).forEach((key) => {
    if (!newLocalData[key]) {
      delete newLocalData[key]
    }
  })

  return newLocalData
}

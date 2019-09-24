export function removeDuplicates (arr, prop) {
  const digest = arr.reduce((acc, el) => {
    if (!acc.has(el[prop])) acc.set(el[prop], el)

    return acc
  }, new Map())

  return [...digest.values()].map(({ group }) => group)
}

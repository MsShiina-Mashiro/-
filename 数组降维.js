const flattenDeep = (arr) =>
  Array.isArray(arr)
    ? arr.reduce((a, b) => [...a, ...flattenDeep(b)], [])
    : [arr]

const res = flattenDeep([1, [[2], [3, [4]], 5]])

console.log(res)

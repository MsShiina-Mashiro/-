const PromiseAll = (promises) => {
  let aResult = []
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('promises must be an array'))
    }
    let i = 0
    next()

    function next() {
      promises[i].then((res) => {
        aResult.push(res)
        i++
        if (i === promises.length) {
          resolve(aResult)
        } else {
          next()
        }
      })
    }
  })
}

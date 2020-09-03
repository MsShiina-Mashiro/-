const PromiseRace = (promises) => {
  let Constructor = this
  if (!Array.isArray(promises)) {
    return new Constructor((_, reject) => {
      return reject(new TypeError('promises must be an array.'))
    })
  } else {
    return new Constructor((resolve, reject) => {
      let length = promises.length
      for (const i = 0; i < length; i++) {
        Constructor.resolve(promises[i]).then(resolve, reject)
      }
    })
  }
}

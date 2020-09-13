const PromiseAll = (promises) => {
  let aResult = []
  return new Promise((resolve, reject)=> {
    if(Array.isArray(promises) === false) {
      return reject(new TypeError('promises must be an array'))
    }
    let i = 0
    next()

    function next() {
      arr[i].then(res => {
        aResult.push(res)
        i++
        if(i === promises.length){
          resolve(aResult)
        }else{
          next()
        }
      })
    }
  })
}

const PromiseRace = (promises) => {
  let aResult = []
  return new Promise((resolve,reject) => {
    if(Array.isArray(promises) === false){
      return reject(new TypeError('promises must be an array'))
    }
    let length = promises.length
    for(let i = 0; i< length; i++){
      promises[i].then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    }
  })
}
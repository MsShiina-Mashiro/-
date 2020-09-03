// 第 159 题：实现 Promise.retry，成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject 

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('server error...')
    },1000)
  })
}

retry = function(fn, times, delay){
  let err = null
  return new Promise((resolve, reject) => {

    let attempt = function(){
      fn().then(resolve).catch(err => {
        console.log(`attemp ${times} failed...`)
        if(0 == times) reject(err)
        else{
          times--
          setTimeout(() => attempt(), delay)
        }
      })
    }

    attempt()

  })
}

// param1: a function to return a promise
// param2: max retry times
// param3: retry time gap
retry(fetchData, 3, 1000)
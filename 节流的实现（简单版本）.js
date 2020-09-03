function throttle(func, delay) {
  let runFlag = false
  return function (e) {
    if (runFlag) {
      return false
    }
    runFlag = true
    setTimeout(() => {
      func(e)
      runFlag = false
    }, delay)
  }
}

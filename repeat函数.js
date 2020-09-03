// 实现 repeat 函数， 实现每隔一段时间执行一次函数， 实现n次

const repeat = (fn, n, time) => {
  return function (args) {
    for (let i = 1; i <= n; i++) {
      setTimeout(fn, i * time, args)
    }
  }
}

const repeatFunc = repeat(console.log, 4, 2000)

repeatFunc('helloworld')

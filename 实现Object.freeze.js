// Object.freeze() 的实现原理, 通过Object.seal()使对象不能被扩展，删除等，再使用Object.defineProperty 设置 writable 为 false

const myFreeze = (obj) => {
  if (obj instanceof Object) {
    Object.seal(obj)
    let p
    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        obj.defineProperty(obj, p, {
          writable: false,
        })
      }
      myFreeze(obj[p])
    }
  }
}

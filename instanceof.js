const instanseof = (left, right) => {
  // 获得类型的原型
  let prototype = right.prototype
  // 获得对象的原型
  left = left.__proto__
  // 判断对象的类型是否等于类型的原型
  while(true){
    if(left === null){
      return false
    }
    if(left === prototype){
      return true
    }
    left = left.__proto__
  }
}
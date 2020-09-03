// 深拷贝
// param1: 原型
// param2: 深拷贝后的
function deepCopy(p, c) {
  var c = c || {}
  for (var i in p) {
    if (typeof p[i] === 'object') {
      c[i] = (p[i].constructor === Array) ? [] : {}
      deepCopy(p[i], c[i])
    }
    else {
      c[i] = p[i]
    }
  }
  return c
}

var parent = {
  numbers: [1,2,3]
}
var deepchild = deepCopy(parent)    // 深拷贝
var shallowchild = parent           // 浅拷贝

console.log('parent.numbers:',parent.numbers)
console.log('deepchild.numbers:',deepchild.numbers)
console.log('shallowchild.numbers:',shallowchild.numbers)

shallowchild.numbers.push(4,5,6)
deepchild.numbers.push(7,8,9)
console.log('parent.numbers:',parent.numbers)
console.log('deepchild.numbers:',deepchild.numbers)
console.log('shallowchild.numbers:',shallowchild.numbers)

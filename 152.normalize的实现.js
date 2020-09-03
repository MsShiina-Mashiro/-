// 第 152 题：实现一个 normalize 函数，能将输入的特定的字符串转化为特定的结构化数据 
// 字符串仅由小写字母和 [] 组成，且字符串不会包含多余的空格。
// 示例一: 'abc' --> {value: 'abc'}
// 示例二：'[abc[bcd[def]]]' --> {value: 'abc', children: {value: 'bcd', children: {value: 'def'}}}

// console.log('[abc[bcd[def]]]'.split(/[\[\]]/g))

const normalize = str => {
  var result = {}
  str.split(/[\[\]]/g).filter(Boolean).reduce((prev, item, index, arr) => {
    prev.value = item
    if (index !== arr.length - 1) {
      prev.children = {}
      return prev.children
    }
  }, result)
  return result
}

console.log(normalize('[abc[bcd[def]]]'))
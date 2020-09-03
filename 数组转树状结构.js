// source = [{
//   id: 1,
//   pid: 0,
//   name: 'body'
// }, {
//   id: 2,
//   pid: 1,
//   name: 'title'
// }, {
//   id: 3,
//   pid: 2,
//   name: 'div'
// }]
// 转换为: [{
//           id: 1,
//           pid: 0,
//           name: 'body',
//           children: [{
//                   id: 2,
//                   pid: 1,
//                   name: 'title',
//                   children: [{
//                       id: 3,
//                       pid: 1,
//                       name: 'div'
//                   }]
//               }
//           }]



var source = [
  {
    id: 1,
    pid: 0,
    name: 'body',
  },
  {
    id: 2,
    pid: 1,
    name: 'title',
  },
  {
    id: 3,
    pid: 1,
    name: 'div',
  },
  {
    id: 4,
    pid: 3,
    name: 'span',
  },
  {
    id: 5,
    pid: 3,
    name: 'icon',
  },
  {
    id: 6,
    pid: 4,
    name: 'subspan',
  },
]

function toTree(arr){
  let res = []
  if(!Array.isArray(arr)) return res
  arr.forEach(item => {
    delete item.children
  })
  let map = []
  arr.forEach(item => {
    map[item.id] = item
  })
  arr.forEach(item => {
    let parent = map[item.pid]
    if(parent){
      (parent.children || (parent.children = [])).push(item)
    }else{
      res.push(item)
    }
  })

  return res
}

console.log(toTree(source));
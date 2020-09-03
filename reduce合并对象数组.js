var objects = [
  { name: 'group1', usedCount: 2, color: 'red' },
  { name: 'group1', usedCount: 1, color: 'blue' },
  { name: 'group1', usedCount: 1, color: 'orange' },
  { name: 'group2', usedCount: 2, color: 'blue' },
  { name: 'group2', usedCount: 2, color: 'red' },
  { name: 'group3', usedCount: 1, color: 'red' },
  { name: 'group3', usedCount: 4, color: 'red' },
]

var result = objects.reduce((groups, item) => {
  var groupFound = groups.find((arrItem) => item.name === arrItem.name)

  if (groupFound) {
    groupFound.usedCount += item.usedCount

    if (groupFound.color.indexOf(item.color) == -1) {
      //去重

      groupFound.color.push(item.color)
    }
  } else {
    //不要直接在原来的对象修改，新建对象

    var newGroup = {
      name: item.name,

      usedCount: item.usedCount,

      color: [item.color],
    }

    groups.push(newGroup)
  }

  return groups
}, [])

console.log(result)

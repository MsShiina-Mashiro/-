// 第 158 题：如何模拟实现 Array.prototype.splice

// param1: where to start
// param2: how many items to be deleted
// param3: addlist added to the original list
// return removed list
Array.prototype._splice = function (start, deleteCount, ...addList) {
  if (start < 0) {
    if (Math.abs(start) > this.length) {
      start = 0
    }
    else {
      start += this.length
    }
    if (typeof deleteCount === 'undefined') deleteCount = this.length - start
    const removeList = this.slice(start, start + deleteCount)
    const rightList = this.slice(start + deleteCount)
    let addIndex = start
    addList.concat(rightList).forEach(item => {
      this[addIndex] = item
      addIndex++
    })
    this.length = addIndex
    return removeList
  }

}

let testArr = [5,6,1,12,4,5,8,4,61,2,3,5,4,1,23,0,5,5,1,2]

function quickSort(arr) {
  if(arr.length<2) return arr
  let left = []
  let right = []
  let midDigit = arr[0]
  arr.forEach(e=>{
    if(e<midDigit) left.push(e)
    else if(e>midDigit) right.push(e)
  })
  return quickSort(left).concat(midDigit, quickSort(right))
}

console.log(quickSort(testArr));
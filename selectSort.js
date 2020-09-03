let testArr = [5, 6, 1, 12, 4, 5, 8, 4, 61, 2, 3, 5, 4, 1, 23, 0, 5, 5, 1, 2];

let selectSort = (arr) => {
  let temp = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      minIndex = arr[j] < arr[minIndex] ? j: minIndex
    }
    if (arr[i] > arr[minIndex]) {
        temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;
      }
  }
  return arr;
};

console.log(selectSort(testArr));
